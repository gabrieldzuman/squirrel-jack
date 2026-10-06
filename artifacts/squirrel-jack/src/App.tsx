import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Dashboard from "@/pages/Dashboard";
import { trackPageView, trackSiteButton } from "@/lib/analytics";
import type { AnalyticsButtonId } from "@workspace/api-client-react";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    const path = location.split(/[?#]/, 1)[0] || "/";
    trackPageView(path);
  }, [location]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (window.location.pathname.replace(/\/+$/, "") === "/dashboard") return;
      if (!(event.target instanceof Element)) return;

      const control = event.target.closest<HTMLElement>("[data-analytics-button]");
      const buttonId = control?.dataset.analyticsButton;
      if (buttonId) trackSiteButton(buttonId as AnalyticsButtonId);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AnalyticsTracker />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
