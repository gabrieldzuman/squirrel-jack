import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { and, eq, gte, isNotNull, lt, sql } from "drizzle-orm";
import {
  GetAnalyticsSummaryQueryParams,
  GetAnalyticsSummaryResponse,
  LoginAnalyticsDashboardBody,
  LoginAnalyticsDashboardResponse,
  LogoutAnalyticsDashboardResponse,
  RecordAnalyticsEventBody,
  type AnalyticsButtonId,
} from "@workspace/api-zod";
import { analyticsEventsTable, db } from "@workspace/db";
import { Router, type IRouter, type NextFunction, type Request, type Response } from "express";

const router: IRouter = Router();
const cookieName = "sj_dashboard";
const dashboardSessionDurationSeconds = 12 * 60 * 60;

const buttonLabels: Record<AnalyticsButtonId, string> = {
  header_logo_home: "Header logo",
  header_nav_home: "Header navigation: Home",
  header_nav_services: "Header navigation: Services",
  header_nav_about: "Header navigation: About Us",
  header_nav_contact: "Header navigation: Contact",
  header_call: "Header phone call",
  mobile_menu_open: "Open mobile menu",
  mobile_menu_close: "Close mobile menu",
  hero_quote: "Home hero: Get a Free Quote",
  hero_call: "Home hero: Call Now",
  gallery_01_before: "Services gallery 01: Before photo",
  gallery_01_after: "Services gallery 01: After photo",
  gallery_02_before: "Services gallery 02: Before photo",
  gallery_02_after: "Services gallery 02: After photo",
  gallery_03_before: "Services gallery 03: Before photo",
  gallery_03_after: "Services gallery 03: After photo",
  gallery_04_before: "Services gallery 04: Before photo",
  gallery_04_after: "Services gallery 04: After photo",
  gallery_05_before: "Services gallery 05: Before photo",
  gallery_05_after: "Services gallery 05: After photo",
  gallery_06_before: "Services gallery 06: Before photo",
  gallery_06_after: "Services gallery 06: After photo",
  services_quote: "Services page: Get a Free Quote",
  services_call: "Services page: Call",
  contact_call: "Contact section: Call Us",
  contact_text: "Contact section: Text Us",
  floating_facebook: "Floating Facebook link",
  floating_call: "Floating call button",
  floating_text: "Floating text button",
  footer_home: "Footer navigation: Home",
  footer_services: "Footer navigation: Services",
  footer_about: "Footer navigation: About Us",
  footer_contact: "Footer navigation: Contact",
};

function readCookie(cookieHeader: string | undefined, name: string): string | undefined {
  if (!cookieHeader) return undefined;

  for (const entry of cookieHeader.split(";")) {
    const separator = entry.indexOf("=");
    if (separator < 0) continue;
    if (entry.slice(0, separator).trim() === name) {
      return entry.slice(separator + 1).trim();
    }
  }

  return undefined;
}

function createDashboardToken(secret: string): string {
  const expiresAt = Math.floor(Date.now() / 1000) + dashboardSessionDurationSeconds;
  const payload = `v1.${expiresAt}.${randomBytes(16).toString("base64url")}`;
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function isDashboardTokenValid(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") return false;

  const expiresAtText = parts[1];
  const nonce = parts[2];
  const signatureText = parts[3];
  if (
    !expiresAtText ||
    !/^[0-9]+$/.test(expiresAtText) ||
    !nonce ||
    !/^[A-Za-z0-9_-]+$/.test(nonce) ||
    !signatureText ||
    !/^[A-Za-z0-9_-]+$/.test(signatureText)
  ) {
    return false;
  }

  const expiresAt = Number(expiresAtText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const payload = parts.slice(0, 3).join(".");
  const expectedSignature = createHmac("sha256", secret).update(payload).digest();
  const suppliedSignature = Buffer.from(signatureText, "base64url");
  return (
    suppliedSignature.length === expectedSignature.length &&
    timingSafeEqual(suppliedSignature, expectedSignature)
  );
}

function requireDashboardSession(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.setHeader("Cache-Control", "no-store");
  const secret = process.env.SESSION_SECRET;
  const password = process.env.DASHBOARD_PASSWORD;
  if (!secret || !password) {
    res.status(503).json({ error: "Dashboard authentication is not configured" });
    return;
  }

  const token = readCookie(req.headers.cookie, cookieName);
  if (!token || !isDashboardTokenValid(token, secret)) {
    res.status(401).json({ error: "Dashboard authentication required" });
    return;
  }

  next();
}

function getMonthWindow(month: string): {
  firstMonth: Date;
  selectedMonthStart: Date;
  endExclusive: Date;
  months: string[];
} {
  const [yearText, monthText] = month.split("-");
  const year = Number(yearText);
  const monthNumber = Number(monthText);
  const firstMonth = new Date(Date.UTC(year, monthNumber - 12, 1));
  const selectedMonthStart = new Date(Date.UTC(year, monthNumber - 1, 1));
  const endExclusive = new Date(Date.UTC(year, monthNumber, 1));
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Date.UTC(year, monthNumber - 12 + index, 1));
    return date.toISOString().slice(0, 7);
  });

  return { firstMonth, selectedMonthStart, endExclusive, months };
}

function setDashboardCookie(res: Response, token: string): void {
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/api/analytics",
    maxAge: dashboardSessionDurationSeconds * 1000,
  });
}

router.post("/analytics/events", async (req, res): Promise<void> => {
  const parsed = RecordAnalyticsEventBody.strict().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid analytics event" });
    return;
  }

  const event = parsed.data;
  const hasValidDetails =
    (event.eventType === "page_view" &&
      event.path !== undefined &&
      event.buttonId === undefined) ||
    (event.eventType === "button_click" &&
      event.buttonId !== undefined &&
      event.path === undefined);

  if (!hasValidDetails) {
    res.status(400).json({ error: "Event details do not match the event type" });
    return;
  }

  await db.insert(analyticsEventsTable).values({
    sessionId: event.sessionId,
    eventType: event.eventType,
    path: event.eventType === "page_view" ? event.path : null,
    buttonId: event.eventType === "button_click" ? event.buttonId : null,
  });

  res.sendStatus(204);
});

router.post("/analytics/login", async (req, res): Promise<void> => {
  res.setHeader("Cache-Control", "no-store");

  const parsed = LoginAnalyticsDashboardBody.strict().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid login request" });
    return;
  }

  const expectedPassword = process.env.DASHBOARD_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;
  if (!expectedPassword || !sessionSecret) {
    res.status(503).json({ error: "Dashboard authentication is not configured" });
    return;
  }

  const expectedHash = createHash("sha256").update(expectedPassword).digest();
  const suppliedHash = createHash("sha256").update(parsed.data.password).digest();
  if (!timingSafeEqual(suppliedHash, expectedHash)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  setDashboardCookie(res, createDashboardToken(sessionSecret));
  res.json(LoginAnalyticsDashboardResponse.parse({ authenticated: true }));
});

router.post("/analytics/logout", (_req, res): void => {
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/api/analytics",
  });
  res.json(LogoutAnalyticsDashboardResponse.parse({ authenticated: false }));
});

router.get(
  "/analytics/summary",
  requireDashboardSession,
  async (req, res): Promise<void> => {
    const parsed = GetAnalyticsSummaryQueryParams.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ error: "Month must use YYYY-MM format" });
      return;
    }

    const selectedMonth = parsed.data.month ?? new Date().toISOString().slice(0, 7);
    const { firstMonth, selectedMonthStart, endExclusive, months } =
      getMonthWindow(selectedMonth);
    const monthExpression = sql<string>`
      to_char(
        date_trunc('month', ${analyticsEventsTable.occurredAt} AT TIME ZONE 'UTC'),
        'YYYY-MM'
      )
    `;
    const visitRows = await db
      .select({
        month: monthExpression,
        siteVisits: sql<number>`
          count(distinct ${analyticsEventsTable.sessionId})
          filter (where ${analyticsEventsTable.eventType} = 'page_view')::integer
        `,
        servicesVisits: sql<number>`
          count(distinct ${analyticsEventsTable.sessionId})
          filter (
            where ${analyticsEventsTable.eventType} = 'page_view'
              and ${analyticsEventsTable.path} = '/services'
          )::integer
        `,
      })
      .from(analyticsEventsTable)
      .where(
        and(
          gte(analyticsEventsTable.occurredAt, firstMonth),
          lt(analyticsEventsTable.occurredAt, endExclusive),
        ),
      )
      .groupBy(monthExpression);

    const buttonRows = await db
      .select({
        buttonId: analyticsEventsTable.buttonId,
        clicks: sql<number>`count(*)::integer`,
      })
      .from(analyticsEventsTable)
      .where(
        and(
          eq(analyticsEventsTable.eventType, "button_click"),
          isNotNull(analyticsEventsTable.buttonId),
          gte(analyticsEventsTable.occurredAt, selectedMonthStart),
          lt(analyticsEventsTable.occurredAt, endExclusive),
        ),
      )
      .groupBy(analyticsEventsTable.buttonId);

    const visitsByMonth = new Map(
      visitRows.map((row) => [
        row.month,
        {
          siteVisits: Number(row.siteVisits),
          servicesVisits: Number(row.servicesVisits),
        },
      ]),
    );
    const clicksByButton = new Map(
      buttonRows
        .filter((row): row is typeof row & { buttonId: string } => row.buttonId !== null)
        .map((row) => [row.buttonId, Number(row.clicks)]),
    );

    const summary = GetAnalyticsSummaryResponse.parse({
      selectedMonth,
      monthly: months.map((month) => ({
        month,
        siteVisits: visitsByMonth.get(month)?.siteVisits ?? 0,
        servicesVisits: visitsByMonth.get(month)?.servicesVisits ?? 0,
      })),
      buttons: Object.entries(buttonLabels).map(([buttonId, label]) => ({
        buttonId,
        label,
        clicks: clicksByButton.get(buttonId) ?? 0,
      })),
    });

    res.json(summary);
  },
);

export default router;
