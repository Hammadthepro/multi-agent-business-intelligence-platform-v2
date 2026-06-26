import { useState } from "react";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Globe, Gauge, ShieldCheck, Accessibility, Award, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const scores = [
  { label: "SEO", value: 86, icon: Award },
  { label: "Performance", value: 72, icon: Gauge },
  { label: "Accessibility", value: 91, icon: Accessibility },
  { label: "Best Practices", value: 78, icon: ShieldCheck },
  { label: "Security", value: 64, icon: ShieldCheck },
];

const metrics = [
  { name: "FCP", value: 1.2 },
  { name: "LCP", value: 2.4 },
  { name: "TBT", value: 0.18 },
  { name: "CLS", value: 0.05 },
  { name: "TTI", value: 3.1 },
];

const recommendations = [
  { sev: "high", title: "Reduce unused JavaScript", impact: "Saves ~480ms on mobile" },
  { sev: "med", title: "Serve images in next-gen formats", impact: "Saves ~210KB" },
  { sev: "med", title: "Enable Content Security Policy header", impact: "Improves security score by 12" },
  { sev: "low", title: "Add explicit width/height to images", impact: "Prevents layout shift" },
];

export default function WebsiteAudit() {
  const [url, setUrl] = useState("https://acme.io");
  const [scanned, setScanned] = useState(true);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!url) return;
    setLoading(true);
    setScanned(false);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setScanned(true);
    toast.success("Audit completed", { description: url });
  };

  return (
    <>
      <PageHeader
        title="Website Audit"
        description="A 360° technical audit covering SEO, performance, accessibility, best practices, and security."
      />

      <div className="surface-card flex flex-wrap items-center gap-3 p-4">
        <div className="relative flex-1 min-w-[260px]">
          <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="pl-9"
          />
        </div>
        <Button
          onClick={run}
          disabled={loading}
          className="bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90"
        >
          {loading ? "Scanning…" : "Run audit"}
        </Button>
      </div>

      {loading && (
        <div className="surface-card mt-6 grid gap-4 p-6 sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 rounded-lg bg-muted shimmer" />
          ))}
        </div>
      )}

      {scanned && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {scores.map((s) => (
              <ScoreCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="surface-card p-6 lg:col-span-2">
              <h3 className="text-base font-semibold">Core web vitals</h3>
              <p className="text-xs text-muted-foreground">Field metrics measured against Google thresholds</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={metrics}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Bar dataKey="value" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="surface-card p-6">
              <h3 className="text-base font-semibold">Recommendations</h3>
              <ul className="mt-4 space-y-3">
                {recommendations.map((r) => (
                  <li key={r.title} className="rounded-lg border border-border bg-card/50 p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          r.sev === "high" && "text-destructive",
                          r.sev === "med" && "text-[oklch(0.82_0.16_75)]",
                          r.sev === "low" && "text-muted-foreground",
                        )}
                      />
                      <div>
                        <p className="text-sm font-medium">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.impact}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function ScoreCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Award }) {
  const color = value > 85 ? "oklch(0.78 0.17 155)" : value > 65 ? "oklch(0.82 0.16 75)" : "oklch(0.66 0.22 25)";
  return (
    <div className="surface-card flex flex-col items-center p-5 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-border)" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.5" fill="none"
            stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={`${(value / 100) * 97.4} 97.4`}
          />
        </svg>
        <span className="text-lg font-semibold tabular-nums">{value}</span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
    </div>
  );
}
