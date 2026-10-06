import {
  type AnalyticsButtonId,
  type AnalyticsEventInput,
} from "@workspace/api-client-react";

type UmamiData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track(name: string, data?: UmamiData): void;
    };
  }
}

const sessionStorageKey = "sj-site-analytics-session";
let fallbackSessionId: string | undefined;

function createSessionId(): string {
  if (typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

function getSessionId(): string {
  try {
    const storedSessionId = window.sessionStorage.getItem(sessionStorageKey);
    if (storedSessionId) return storedSessionId;

    const sessionId = createSessionId();
    window.sessionStorage.setItem(sessionStorageKey, sessionId);
    return sessionId;
  } catch {
    fallbackSessionId ??= createSessionId();
    return fallbackSessionId;
  }
}

function sendEvent(event: Omit<AnalyticsEventInput, "sessionId">): void {
  if (typeof window === "undefined" || typeof navigator === "undefined") return;

  const payload: AnalyticsEventInput = {
    ...event,
    sessionId: getSessionId(),
  };
  const body = JSON.stringify(payload);

  try {
    if (
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon(
        "/api/analytics/events",
        new Blob([body], { type: "application/json" }),
      )
    ) {
      return;
    }
  } catch {
    // Analytics must not interrupt navigation or other site actions.
  }

  try {
    void fetch("/api/analytics/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      credentials: "same-origin",
    }).catch(() => {
      // Analytics must never break the public site.
    });
  } catch {
    // Analytics must never break the public site.
  }
}

export function trackPageView(path: string): void {
  if (path === "/" || path === "/services") {
    sendEvent({ eventType: "page_view", path });
  }
}

export function trackSiteButton(buttonId: AnalyticsButtonId): void {
  sendEvent({ eventType: "button_click", buttonId });

  try {
    window.umami?.track("site_button_click", { button_id: buttonId });
  } catch {
    // Analytics must never break the public site.
  }
}
