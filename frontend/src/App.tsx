import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import MarketResearch from "@/pages/MarketResearch";
import Competitors from "@/pages/Competitors";
import LeadGeneration from "@/pages/LeadGeneration";
import WebsiteAudit from "@/pages/WebsiteAudit";
import OpportunityScoring from "@/pages/OpportunityScoring";
import OutreachGenerator from "@/pages/OutreachGenerator";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market-research" element={<MarketResearch />} />
          <Route path="/competitors" element={<Competitors />} />
          <Route path="/leads" element={<LeadGeneration />} />
          <Route path="/website-audit" element={<WebsiteAudit />} />
          <Route path="/opportunities" element={<OpportunityScoring />} />
          <Route path="/outreach" element={<OutreachGenerator />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster theme="dark" position="top-right" richColors />
    </>
  );
}
