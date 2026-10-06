import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAnalyticsSummary,
  useLoginAnalyticsDashboard,
  useLogoutAnalyticsDashboard,
} from "@workspace/api-client-react";
import {
  ArrowUpRight,
  BarChart3,
  Eye,
  KeyRound,
  LockKeyhole,
  LogOut,
  MousePointer2,
  RefreshCw,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const currentMonth = new Date().toISOString().slice(0, 7);

function errorStatus(error: unknown) {
  if (typeof error === "object" && error !== null && "status" in error) {
    return (error as { status?: number }).status;
  }
  return undefined;
}

function monthLabel(month: string, options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" }) {
  const date = new Date(`${month}-01T12:00:00Z`);
  return Number.isNaN(date.getTime())
    ? month
    : new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(date);
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function DashboardStyles() {
  return (
    <style>{`
      .sj-dashboard {
        --sj-ink: #20382d;
        --sj-muted: #6b786e;
        --sj-line: #e4e8df;
        --sj-paper: #f7f8f1;
        --sj-card: #fffef9;
        --sj-forest: #254c38;
        --sj-leaf: #83a96b;
        --sj-orange: #e48737;
        min-height: 100dvh;
        background:
          radial-gradient(ellipse at 96% 0%, rgba(216, 226, 198, .36), transparent 35rem),
          var(--sj-paper);
        color: var(--sj-ink);
        font-family: 'Roboto', sans-serif;
        padding: 0 28px 56px;
      }
      .sj-dashboard * { box-sizing: border-box; }
      .sj-topbar {
        max-width: 1160px; margin: 0 auto; min-height: 82px; display: flex;
        align-items: center; justify-content: space-between; border-bottom: 1px solid var(--sj-line);
      }
      .sj-brand { display: inline-flex; align-items: center; gap: 12px; color: var(--sj-ink); text-decoration: none; }
      .sj-brand-mark {
        width: 37px; height: 37px; border-radius: 12px; display: grid; place-items: center;
        background: var(--sj-forest); color: #f8f5e9; box-shadow: 0 4px 10px rgba(32,56,45,.14);
      }
      .sj-brand-name { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 800; letter-spacing: -.035em; }
      .sj-brand-sub { display: block; margin-top: 2px; color: var(--sj-muted); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; }
      .sj-top-right { display: flex; align-items: center; gap: 12px; color: var(--sj-muted); font-size: 12px; }
      .sj-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #719856; display: inline-block; margin-right: 7px; }
      .sj-content { max-width: 1160px; margin: 0 auto; }
      .sj-page-head {
        display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
        padding: 39px 0 26px;
      }
      .sj-eyebrow { display: flex; align-items: center; gap: 8px; color: #70806f; font-size: 10px; font-weight: 700; letter-spacing: .17em; text-transform: uppercase; }
      .sj-eyebrow:before { content: ''; width: 22px; height: 1px; background: var(--sj-orange); }
      .sj-title { margin: 10px 0 8px; color: var(--sj-ink); font: 800 clamp(28px, 4vw, 40px)/1.06 'Montserrat', sans-serif; letter-spacing: -.055em; }
      .sj-intro { margin: 0; color: var(--sj-muted); font-size: 14px; line-height: 1.6; }
      .sj-month-control { display: flex; flex-direction: column; gap: 7px; min-width: 178px; }
      .sj-month-control label { color: #768176; font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      .sj-month-input {
        appearance: none; border: 1px solid #dce2d8; border-radius: 9px; background: var(--sj-card);
        min-height: 42px; padding: 0 12px; color: var(--sj-ink); font: 600 13px 'Roboto', sans-serif;
        box-shadow: 0 2px 8px rgba(32,56,45,.03); outline: none;
      }
      .sj-month-input:focus-visible, .sj-button:focus-visible, .sj-password:focus-visible {
        outline: 3px solid rgba(228,135,55,.26); outline-offset: 2px;
      }
      .sj-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 16px; }
      .sj-stat {
        position: relative; min-height: 150px; overflow: hidden; padding: 22px 24px 20px;
        background: var(--sj-card); border: 1px solid var(--sj-line); border-radius: 13px;
        box-shadow: 0 3px 12px rgba(32,56,45,.035);
      }
      .sj-stat:after { content: ''; position: absolute; width: 110px; height: 110px; border: 1px solid rgba(131,169,107,.2); border-radius: 50%; right: -40px; top: -42px; }
      .sj-stat-top { display: flex; align-items: center; gap: 8px; color: #778278; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
      .sj-stat-icon { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; color: var(--sj-forest); background: #eef3e8; }
      .sj-stat-value { margin-top: 14px; font: 800 37px/1 'Montserrat', sans-serif; letter-spacing: -.055em; color: var(--sj-ink); }
      .sj-stat-note { margin-top: 8px; color: #849086; font-size: 12px; }
      .sj-panel {
        background: var(--sj-card); border: 1px solid var(--sj-line); border-radius: 13px;
        box-shadow: 0 3px 12px rgba(32,56,45,.035);
      }
      .sj-chart-panel { padding: 23px 24px 20px; }
      .sj-panel-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
      .sj-panel-title { margin: 0; font: 700 16px 'Montserrat', sans-serif; letter-spacing: -.025em; }
      .sj-panel-caption { margin: 5px 0 0; color: var(--sj-muted); font-size: 12px; }
      .sj-legend { display: flex; gap: 17px; color: #7b867d; font-size: 11px; align-items: center; }
      .sj-legend-item { display: inline-flex; align-items: center; gap: 7px; }
      .sj-legend-swatch { width: 8px; height: 8px; border-radius: 3px; background: var(--sj-forest); }
      .sj-legend-swatch.services { background: var(--sj-orange); }
      .sj-chart { height: 206px; display: flex; align-items: stretch; gap: 9px; padding: 25px 0 0; }
      .sj-chart-column { min-width: 0; flex: 1; display: flex; flex-direction: column; align-items: center; }
      .sj-bar-zone { width: 100%; flex: 1; display: flex; align-items: flex-end; justify-content: center; gap: 3px; border-bottom: 1px solid #e8ebe4; }
      .sj-bar {
        width: min(13px, 30%); min-height: 2px; border-radius: 4px 4px 0 0; background: var(--sj-forest);
        transition: transform .2s ease, opacity .2s ease; transform-origin: bottom;
      }
      .sj-bar.services { background: var(--sj-orange); }
      .sj-chart-column.selected .sj-bar-zone { border-bottom: 2px solid var(--sj-orange); }
      .sj-chart-column.selected .sj-month-name { color: var(--sj-ink); font-weight: 700; }
      .sj-month-name { margin-top: 9px; color: #8c968d; font-size: 10px; }
      .sj-empty-chart { width: 100%; display: grid; place-items: center; color: #849086; font-size: 12px; text-align: center; }
      .sj-clicks-panel { margin-top: 16px; overflow: hidden; }
      .sj-clicks-head { padding: 21px 24px 15px; display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; }
      .sj-count-chip { border-radius: 999px; background: #f0f3eb; color: #687969; padding: 6px 10px; font-size: 10px; font-weight: 700; letter-spacing: .06em; white-space: nowrap; }
      .sj-click-list { border-top: 1px solid #edf0e9; }
      .sj-click-row { display: grid; grid-template-columns: minmax(0,1fr) 110px 60px; align-items: center; gap: 15px; padding: 12px 24px; min-height: 48px; border-bottom: 1px solid #f0f1eb; }
      .sj-click-row:last-child { border-bottom: 0; }
      .sj-click-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #405449; font-size: 12px; font-weight: 500; }
      .sj-click-id { color: #a0a9a0; font: 10px 'Roboto', sans-serif; }
      .sj-click-track { height: 5px; border-radius: 9px; background: #edf0e9; overflow: hidden; }
      .sj-click-track-fill { display: block; height: 100%; border-radius: inherit; background: #84a66c; }
      .sj-click-number { color: var(--sj-ink); text-align: right; font: 700 13px 'Montserrat', sans-serif; }
      .sj-empty { padding: 30px 24px; color: var(--sj-muted); text-align: center; font-size: 13px; }
      .sj-footer { display: flex; justify-content: space-between; gap: 18px; padding: 18px 2px 0; color: #8a958b; font-size: 11px; }
      .sj-secure { display: inline-flex; align-items: center; gap: 6px; }
      .sj-button {
        border: 0; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center;
        gap: 8px; min-height: 38px; padding: 0 13px; color: #fffdf3; background: var(--sj-forest);
        font: 700 12px 'Roboto', sans-serif; cursor: pointer; transition: transform .18s ease, opacity .18s ease;
      }
      .sj-button:hover:not(:disabled) { transform: translateY(-1px); }
      .sj-button:disabled { opacity: .58; cursor: wait; }
      .sj-button.subtle { color: #4c5f51; background: #edf1e8; }
      .sj-logout { min-height: 34px; color: #56695a; background: transparent; border: 1px solid #dce3d8; }
      .sj-login-shell { min-height: calc(100dvh - 83px); display: grid; place-items: center; padding: 40px 0 70px; }
      .sj-login-card {
        width: min(100%, 458px); padding: 36px 38px 32px; border: 1px solid var(--sj-line);
        border-radius: 16px; background: var(--sj-card); box-shadow: 0 18px 54px rgba(35,62,45,.09);
      }
      .sj-login-icon { display: grid; place-items: center; width: 45px; height: 45px; border-radius: 13px; color: var(--sj-forest); background: #edf3e8; }
      .sj-login-title { margin: 23px 0 9px; color: var(--sj-ink); font: 800 27px/1.12 'Montserrat', sans-serif; letter-spacing: -.05em; }
      .sj-login-copy { margin: 0; color: var(--sj-muted); font-size: 13px; line-height: 1.65; }
      .sj-login-form { margin-top: 26px; }
      .sj-login-label { display: block; margin-bottom: 8px; color: #617264; font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
      .sj-password-wrap { position: relative; }
      .sj-password { width: 100%; height: 46px; border: 1px solid #dce3d9; border-radius: 8px; padding: 0 13px 0 40px; background: #fffefb; color: var(--sj-ink); font: 14px 'Roboto', sans-serif; outline: none; }
      .sj-password-icon { position: absolute; top: 14px; left: 13px; color: #8a968b; }
      .sj-login-form .sj-button { width: 100%; height: 44px; margin-top: 13px; }
      .sj-form-error { margin: 10px 0 0; color: #a34735; font-size: 12px; line-height: 1.5; }
      .sj-login-foot { display: flex; align-items: center; gap: 7px; margin-top: 24px; padding-top: 17px; border-top: 1px solid #edf0e9; color: #889389; font-size: 11px; }
      .sj-state-card { margin: 8vh auto 0; max-width: 460px; text-align: center; padding: 42px 32px; }
      .sj-state-card .sj-button { margin-top: 18px; }
      .sj-skeleton { position: relative; overflow: hidden; background: #e9eee5; border-radius: 6px; }
      .sj-skeleton:after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.58), transparent); transform: translateX(-100%); animation: sj-shimmer 1.5s infinite; }
      @keyframes sj-shimmer { to { transform: translateX(100%); } }
      @media (max-width: 700px) {
        .sj-dashboard { padding: 0 17px 36px; }
        .sj-topbar { min-height: 70px; }
        .sj-page-head { align-items: flex-start; flex-direction: column; padding: 29px 0 20px; gap: 18px; }
        .sj-month-control { width: 100%; }
        .sj-month-input { width: 100%; }
        .sj-stat-grid { grid-template-columns: 1fr; gap: 10px; }
        .sj-stat { min-height: 130px; padding: 18px 20px; }
        .sj-stat-value { font-size: 33px; }
        .sj-chart-panel { padding: 19px 16px 17px; }
        .sj-panel-heading { flex-direction: column; }
        .sj-chart { gap: 4px; height: 190px; }
        .sj-month-name { font-size: 9px; }
        .sj-clicks-head { padding: 18px 17px 13px; }
        .sj-click-row { grid-template-columns: minmax(0,1fr) 44px; gap: 10px; padding: 12px 17px; }
        .sj-click-track { display: none; }
        .sj-click-label { white-space: normal; line-height: 1.4; }
        .sj-click-id { display: block; margin-top: 3px; font-size: 9px; }
        .sj-footer { flex-direction: column; gap: 7px; }
        .sj-top-right > span { display: none; }
        .sj-login-card { padding: 30px 24px 25px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .sj-skeleton:after { animation: none; }
        .sj-button, .sj-bar { transition: none; }
      }
    `}</style>
  );
}

function Header({ authenticated, onLogout, loggingOut }: { authenticated: boolean; onLogout?: () => void; loggingOut?: boolean }) {
  return (
    <header className="sj-topbar">
      <div className="sj-brand" aria-label="Squirrel Jack Junk Removal">
        <span className="sj-brand-mark"><Wrench size={18} strokeWidth={2.2} /></span>
        <span className="sj-brand-name">SQUIRREL JACK<span className="sj-brand-sub">Junk Removal · Lexington, KY</span></span>
      </div>
      <div className="sj-top-right">
        {authenticated ? (
          <>
            <span><i className="sj-live-dot" />Private dashboard</span>
            <button type="button" className="sj-button sj-logout" onClick={onLogout} disabled={loggingOut} data-testid="button-logout">
              <LogOut size={14} />{loggingOut ? "Signing out" : "Sign out"}
            </button>
          </>
        ) : (
          <span><LockKeyhole size={14} /> Owner access</span>
        )}
      </div>
    </header>
  );
}

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const queryClient = useQueryClient();
  const summaryQuery = useGetAnalyticsSummary(
    { month: selectedMonth },
    {
      query: {
        enabled: authenticated !== false,
        queryKey: ["/api/analytics/summary", { month: selectedMonth }],
        retry: false,
      },
      request: { credentials: "include" },
    },
  );
  const login = useLoginAnalyticsDashboard({
    request: { credentials: "include" },
  });
  const logout = useLogoutAnalyticsDashboard({
    request: { credentials: "include" },
  });

  useEffect(() => {
    if (summaryQuery.data) setAuthenticated(true);
  }, [summaryQuery.data]);

  useEffect(() => {
    if (
      summaryQuery.isError &&
      !summaryQuery.isFetching &&
      errorStatus(summaryQuery.error) === 401
    ) {
      setAuthenticated(false);
      setPassword("");
      queryClient.removeQueries({ queryKey: ["/api/analytics/summary"] });
    }
  }, [summaryQuery.isError, summaryQuery.isFetching, summaryQuery.error, queryClient]);

  const selectedStats = useMemo(() => {
    const months = summaryQuery.data?.monthly ?? [];
    return months.find((month) => month.month === selectedMonth);
  }, [summaryQuery.data, selectedMonth]);
  const chartMonths = useMemo(
    () => summaryQuery.data?.monthly ?? [],
    [summaryQuery.data],
  );
  const clickRows = useMemo(() => {
    return [...(summaryQuery.data?.buttons ?? [])].sort((a, b) => b.clicks - a.clicks || a.label.localeCompare(b.label));
  }, [summaryQuery.data]);
  const chartMaximum = Math.max(1, ...chartMonths.flatMap((month) => [month.siteVisits, month.servicesVisits]));
  const totalClicks = clickRows.reduce((sum, item) => sum + item.clicks, 0);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInvalidPassword(false);
    login.mutate(
      { data: { password } },
      {
        onSuccess: () => {
          setPassword("");
          setAuthenticated(true);
          void queryClient.invalidateQueries({ queryKey: summaryQuery.queryKey });
        },
        onError: (error) => {
          setInvalidPassword(errorStatus(error) === 401 || errorStatus(error) === 403);
        },
      },
    );
  }

  function handleLogout() {
    logout.mutate(undefined, {
      onSuccess: () => {
        setAuthenticated(false);
        setPassword("");
        setInvalidPassword(false);
        queryClient.removeQueries({ queryKey: ["/api/analytics/summary"] });
      },
    });
  }

  const loading = authenticated === null && (summaryQuery.isLoading || summaryQuery.isFetching);
  const generalError = authenticated !== false && summaryQuery.isError && errorStatus(summaryQuery.error) !== 401;

  return (
    <main className="sj-dashboard">
      <DashboardStyles />
      <Header
        authenticated={authenticated === true}
        onLogout={handleLogout}
        loggingOut={logout.isPending}
      />

      {authenticated === false ? (
        <section className="sj-login-shell">
          <div className="sj-login-card">
            <div className="sj-login-icon"><KeyRound size={21} /></div>
            <div className="sj-eyebrow" style={{ marginTop: 21 }}>Owner access</div>
            <h1 className="sj-login-title">Your site, at a glance.</h1>
            <p className="sj-login-copy">Sign in to see how people are finding Squirrel Jack and which parts of the site they use.</p>
            <form className="sj-login-form" onSubmit={handleLogin}>
              <label className="sj-login-label" htmlFor="dashboard-password">Dashboard password</label>
              <div className="sj-password-wrap">
                <LockKeyhole size={16} className="sj-password-icon" />
                <input
                  id="dashboard-password"
                  className="sj-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (invalidPassword) setInvalidPassword(false);
                  }}
                  placeholder="Enter your password"
                  required
                  data-testid="input-dashboard-password"
                  aria-invalid={invalidPassword}
                  aria-describedby={invalidPassword ? "password-error" : undefined}
                />
              </div>
              {invalidPassword && <p className="sj-form-error" id="password-error" role="alert">That password did not match. Please try again.</p>}
              {login.isError && !invalidPassword && <p className="sj-form-error" role="alert">We could not sign you in right now. Please try again.</p>}
              <button type="submit" className="sj-button" disabled={login.isPending || !password.trim()} data-testid="button-login">
                {login.isPending ? "Checking password" : "Open dashboard"} {!login.isPending && <ArrowUpRight size={15} />}
              </button>
            </form>
            <div className="sj-login-foot"><ShieldCheck size={14} />Private owner dashboard. Your session is protected.</div>
          </div>
        </section>
      ) : loading ? (
        <div className="sj-content" aria-label="Loading dashboard" data-testid="status-dashboard-loading">
          <div className="sj-page-head">
            <div><div className="sj-skeleton" style={{ width: 112, height: 10 }} /><div className="sj-skeleton" style={{ width: 240, height: 34, marginTop: 14 }} /><div className="sj-skeleton" style={{ width: 285, height: 12, marginTop: 12 }} /></div>
          </div>
          <div className="sj-stat-grid">
            {[1, 2].map((key) => <div className="sj-stat" key={key}><div className="sj-skeleton" style={{ width: 140, height: 12 }} /><div className="sj-skeleton" style={{ width: 100, height: 36, marginTop: 20 }} /></div>)}
          </div>
          <div className="sj-panel" style={{ height: 290, padding: 24 }}><div className="sj-skeleton" style={{ width: 175, height: 17 }} /><div className="sj-skeleton" style={{ width: "100%", height: 190, marginTop: 25 }} /></div>
        </div>
      ) : generalError ? (
        <section className="sj-panel sj-state-card" role="alert" data-testid="status-dashboard-error">
          <div className="sj-login-icon" style={{ margin: "0 auto" }}><RefreshCw size={20} /></div>
          <h1 className="sj-login-title" style={{ fontSize: 22 }}>We could not load your numbers.</h1>
          <p className="sj-login-copy">The dashboard is having trouble reaching its data. Your password and settings have not changed.</p>
          <button className="sj-button" onClick={() => void summaryQuery.refetch()} data-testid="button-retry-dashboard"><RefreshCw size={14} />Try again</button>
        </section>
      ) : authenticated === true ? (
        <div className="sj-content">
          <section className="sj-page-head">
            <div>
              <div className="sj-eyebrow">Website activity</div>
              <h1 className="sj-title">A clear view of the month.</h1>
              <p className="sj-intro">A simple read on visits and the actions people take on your site.</p>
            </div>
            <div className="sj-month-control">
              <label htmlFor="selected-month">Viewing month</label>
              <input
                id="selected-month"
                className="sj-month-input"
                type="month"
                max={currentMonth}
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value || currentMonth)}
                data-testid="input-selected-month"
              />
            </div>
          </section>

          <section className="sj-stat-grid" aria-label={`Summary for ${monthLabel(selectedMonth)}`}>
            <article className="sj-stat" data-testid="metric-site-visits">
              <div className="sj-stat-top"><span className="sj-stat-icon"><Eye size={15} /></span>Website visits</div>
              <div className="sj-stat-value">{selectedStats ? formatCount(selectedStats.siteVisits) : "0"}</div>
              <div className="sj-stat-note">{monthLabel(selectedMonth)} · all pages</div>
            </article>
            <article className="sj-stat" data-testid="metric-services-visits">
              <div className="sj-stat-top"><span className="sj-stat-icon"><BarChart3 size={15} /></span>Services page visits</div>
              <div className="sj-stat-value">{selectedStats ? formatCount(selectedStats.servicesVisits) : "0"}</div>
              <div className="sj-stat-note">Visits to /services in {monthLabel(selectedMonth, { month: "long" })}</div>
            </article>
          </section>

          <section className="sj-panel sj-chart-panel" aria-label="Monthly visit trend">
            <div className="sj-panel-heading">
              <div>
                <h2 className="sj-panel-title">Visits through the year</h2>
                <p className="sj-panel-caption">Monthly visits across the last 12 months</p>
              </div>
              <div className="sj-legend" aria-label="Chart legend">
                <span className="sj-legend-item"><i className="sj-legend-swatch" />Website</span>
                <span className="sj-legend-item"><i className="sj-legend-swatch services" />Services</span>
              </div>
            </div>
            {chartMonths.length > 0 ? (
              <div className="sj-chart" role="img" aria-label="Bar chart showing website and Services page visits by month">
                {chartMonths.map((month) => {
                  const siteHeight = month.siteVisits === 0 ? 2 : Math.max(4, (month.siteVisits / chartMaximum) * 100);
                  const servicesHeight = month.servicesVisits === 0 ? 2 : Math.max(4, (month.servicesVisits / chartMaximum) * 100);
                  return (
                    <div className={`sj-chart-column${month.month === selectedMonth ? " selected" : ""}`} key={month.month} title={`${monthLabel(month.month)}: ${formatCount(month.siteVisits)} website visits, ${formatCount(month.servicesVisits)} Services visits`}>
                      <div className="sj-bar-zone">
                        <span className="sj-bar" style={{ height: `${siteHeight}%`, opacity: month.siteVisits === 0 ? .18 : 1 }} />
                        <span className="sj-bar services" style={{ height: `${servicesHeight}%`, opacity: month.servicesVisits === 0 ? .22 : 1 }} />
                      </div>
                      <span className="sj-month-name">{monthLabel(month.month, { month: "short" })}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="sj-empty-chart" style={{ height: 180 }}>No monthly visit data is available yet.</div>
            )}
          </section>

          <section className="sj-panel sj-clicks-panel" aria-labelledby="clicks-title">
            <div className="sj-clicks-head">
              <div>
                <h2 className="sj-panel-title" id="clicks-title">Button activity</h2>
                <p className="sj-panel-caption">Clicks recorded across the site in {monthLabel(selectedMonth)}.</p>
              </div>
              <span className="sj-count-chip">{formatCount(totalClicks)} total clicks</span>
            </div>
            {clickRows.length ? (
              <div className="sj-click-list">
                {clickRows.map((button) => (
                  <div className="sj-click-row" key={button.buttonId} data-testid={`row-button-clicks-${button.buttonId}`}>
                    <div className="sj-click-label">
                      {button.label}
                      <span className="sj-click-id">{button.buttonId}</span>
                    </div>
                    <div className="sj-click-track" aria-hidden="true">
                      <span className="sj-click-track-fill" style={{ width: `${totalClicks > 0 ? Math.max(button.clicks > 0 ? 3 : 0, (button.clicks / Math.max(1, ...clickRows.map((item) => item.clicks))) * 100) : 0}%` }} />
                    </div>
                    <span className="sj-click-number" data-testid={`text-click-count-${button.buttonId}`}>{formatCount(button.clicks)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="sj-empty" data-testid="status-button-clicks-empty">Button activity is not available for this month.</div>
            )}
          </section>

          <footer className="sj-footer">
            <span>Activity for {monthLabel(selectedMonth)} · Lexington, Kentucky</span>
            <span className="sj-secure"><MousePointer2 size={12} />Visits and button clicks only</span>
          </footer>
        </div>
      ) : null}
    </main>
  );
}
