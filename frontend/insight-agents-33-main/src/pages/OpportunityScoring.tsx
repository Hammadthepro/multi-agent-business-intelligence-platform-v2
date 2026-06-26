import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, Sparkles, Target, Clock, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const radar = [
  { axis: "Market Fit", v: 88 },
  { axis: "Demand", v: 76 },
  { axis: "Competition", v: 54 },
  { axis: "Acquisition", v: 71 },
  { axis: "Retention", v: 82 },
  { axis: "Monetization", v: 68 },
];

const opportunities = [
  { title: "Launch self-serve tier in EMEA", score: 92, eta: "Q3", impact: "High" },
  { title: "Partner with 2 mid-market CRMs", score: 84, eta: "Q3", impact: "High" },
  { title: "Enterprise SOC2 expansion", score: 78, eta: "Q4", impact: "Medium" },
  { title: "Vertical playbook: HealthTech", score: 72, eta: "Q4", impact: "Medium" },
  { title: "Expand outbound team in DACH", score: 65, eta: "Q1", impact: "Medium" },
];

const timeline = [
  { q: "Q3 2025", items: ["Self-serve launch", "EMEA expansion kickoff"] },
  { q: "Q4 2025", items: ["SOC2 Type II", "HealthTech vertical playbook"] },
  { q: "Q1 2026", items: ["DACH outbound team", "Pricing experiment"] },
];

export default function OpportunityScoring() {
  return (
    <>
      <PageHeader
        title="Opportunity Scoring"
        description="The scoring agent synthesizes signals across research, competitors and audit to surface what to do next."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="surface-card flex flex-col items-center justify-center p-8 text-center lg:col-span-1">
          <div className="relative flex h-44 w-44 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[image:var(--gradient-glow)] blur-xl" />
            <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-border)" strokeWidth="2" />
              <circle
                cx="18" cy="18" r="15.5" fill="none"
                stroke="url(#grad)" strokeWidth="2.6" strokeLinecap="round"
                strokeDasharray={`${(0.78) * 97.4} 97.4`}
              />
              <defs>
                <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" />
                  <stop offset="100%" stopColor="var(--color-chart-5)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="relative">
              <div className="text-5xl font-semibold tracking-tight gradient-text">78</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Overall score</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Above the 71st percentile of analyzed businesses in your category.
          </p>
        </div>

        <div className="surface-card p-6 lg:col-span-2">
          <h3 className="text-base font-semibold">Capability radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radar}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
              <PolarRadiusAxis stroke="var(--color-border)" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} angle={30} />
              <Radar dataKey="v" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.35} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="surface-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Priority opportunities</h3>
            <Badge variant="secondary" className="border-border bg-secondary">Ranked</Badge>
          </div>
          <div className="space-y-3">
            {opportunities.map((o, i) => (
              <div
                key={o.title}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{o.title}</p>
                  <p className="text-xs text-muted-foreground">Target {o.eta} · Impact {o.impact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-base font-semibold tabular-nums">{o.score}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-6">
          <h3 className="text-base font-semibold">Roadmap timeline</h3>
          <ol className="mt-5 space-y-6">
            {timeline.map((t, i) => (
              <li key={t.q} className="relative pl-6">
                <span
                  className={cn(
                    "absolute left-0 top-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-border",
                    i === 0 && "bg-[image:var(--gradient-primary)]",
                  )}
                >
                  {i === 0 ? <Sparkles className="h-2.5 w-2.5 text-primary-foreground" /> : <Clock className="h-2.5 w-2.5 text-muted-foreground" />}
                </span>
                <p className="text-sm font-medium">{t.q}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {t.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <Target className="h-3 w-3" />
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="surface-card mt-6 p-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-base font-semibold">Recommendations</h3>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "Tighten ICP to mid-market SaaS in EMEA — current targeting is 28% too broad.",
            "Add usage-based pricing rail; competitors converting 2.4x better on this model.",
            "Launch lightweight integration with HubSpot to reduce time-to-value.",
            "Publish 4 vertical case studies focused on FinTech and HealthTech.",
          ].map((r) => (
            <li key={r} className="rounded-lg border border-border bg-card/50 p-3 text-sm text-muted-foreground">
              {r}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
