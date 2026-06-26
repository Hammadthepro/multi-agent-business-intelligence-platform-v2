import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sparkles, Download, ChevronDown, TrendingUp, Globe2, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/StatCard";

const schema = z.object({
  business: z.string().min(2, "Required"),
  targetMarket: z.string().min(2, "Required"),
  industry: z.string().min(1, "Required"),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const sizeData = [
  { year: "2021", value: 12 },
  { year: "2022", value: 18 },
  { year: "2023", value: 27 },
  { year: "2024", value: 41 },
  { year: "2025", value: 58 },
];
const segments = [
  { name: "Enterprise", value: 42 },
  { name: "Mid-market", value: 31 },
  { name: "SMB", value: 18 },
  { name: "Startup", value: 9 },
];
const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"];

const insights = [
  {
    title: "TAM expanding 38% YoY",
    summary: "Driven by enterprise adoption of agentic workflows in finance and healthcare.",
    detail:
      "Cross-referenced 2,400 funding rounds and 17 analyst reports. Enterprise spend on multi-agent platforms is projected to hit $14.8B by 2027 with CAGR of 31%.",
  },
  {
    title: "Buyer persona shift",
    summary: "Procurement now involves CIO, Head of Ops, and Chief AI Officer.",
    detail:
      "Average buying committee grew from 4.2 to 6.7 stakeholders in 18 months. Decision cycles extended ~22%, but contract values nearly doubled.",
  },
  {
    title: "Regulatory tailwind in EU",
    summary: "EU AI Act compliance is creating a moat for auditable platforms.",
    detail:
      "Article 14 favors providers with traceable agent execution logs and human-in-the-loop controls — directly aligned with MABI's architecture.",
  },
];

export default function MarketResearch() {
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { business: "", targetMarket: "", industry: "", notes: "" },
  });
  const industry = watch("industry");

  const onSubmit = async (_v: FormValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setHasResults(true);
    toast.success("Market research complete", { description: "3 insight clusters generated." });
  };

  return (
    <>
      <PageHeader
        title="Market Research"
        description="Profile your business and let the research agent map TAM, segments, trends, and buyer personas."
        actions={
          hasResults && (
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="surface-card space-y-5 p-6 lg:col-span-1"
        >
          <div className="space-y-1.5">
            <Label htmlFor="business">Business name</Label>
            <Input id="business" placeholder="Acme Corp" {...register("business")} />
            {errors.business && <p className="text-xs text-destructive">{errors.business.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="targetMarket">Target market</Label>
            <Input id="targetMarket" placeholder="Mid-market SaaS in EMEA" {...register("targetMarket")} />
            {errors.targetMarket && <p className="text-xs text-destructive">{errors.targetMarket.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Industry</Label>
            <Select value={industry} onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}>
              <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fintech">FinTech</SelectItem>
                <SelectItem value="health">HealthTech</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="ecom">E-commerce</SelectItem>
                <SelectItem value="manuf">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
            {errors.industry && <p className="text-xs text-destructive">{errors.industry.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Additional context</Label>
            <Textarea id="notes" rows={4} placeholder="Anything else the agent should know" {...register("notes")} />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90"
          >
            {loading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyzing market…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Run analysis
              </>
            )}
          </Button>
        </form>

        <div className="space-y-6 lg:col-span-2">
          {!hasResults && !loading && (
            <div className="surface-card flex h-full min-h-[420px] flex-col items-center justify-center p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No analysis yet</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Fill the business profile and run the agent to see TAM sizing, segment breakdowns and qualified insights.
              </p>
            </div>
          )}

          {loading && (
            <div className="surface-card space-y-4 p-8">
              <div className="h-6 w-1/3 rounded shimmer bg-muted" />
              <div className="h-44 w-full rounded-lg shimmer bg-muted" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-lg shimmer bg-muted" />
                <div className="h-20 rounded-lg shimmer bg-muted" />
                <div className="h-20 rounded-lg shimmer bg-muted" />
              </div>
            </div>
          )}

          {hasResults && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard label="TAM (2025)" value="$58B" delta={41} icon={TrendingUp} />
                <StatCard label="Active competitors" value="217" delta={9} icon={Users} />
                <StatCard label="Geographies" value="14" helper="primary markets" icon={Globe2} />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="surface-card p-5">
                  <h3 className="text-sm font-semibold">Market size ($B)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={sizeData}>
                      <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="year" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                      <Bar dataKey="value" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="surface-card p-5">
                  <h3 className="text-sm font-semibold">Segment mix</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={segments} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                        {segments.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} stroke="var(--color-background)" />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    {segments.map((s, i) => (
                      <div key={s.name} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                        <span className="text-muted-foreground">{s.name}</span>
                        <span className="ml-auto font-medium">{s.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="surface-card divide-y divide-border">
                {insights.map((ins) => (
                  <Collapsible key={ins.title} className="p-5">
                    <CollapsibleTrigger className="group flex w-full items-start justify-between text-left">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="border-border bg-secondary text-[10px] uppercase tracking-wider">
                            Insight
                          </Badge>
                          <h4 className="text-sm font-semibold">{ins.title}</h4>
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground">{ins.summary}</p>
                      </div>
                      <ChevronDown className="ml-4 mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 rounded-md border border-border bg-card/50 p-4 text-sm text-muted-foreground">
                      {ins.detail}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
