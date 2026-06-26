import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { ChevronDown, Plus, Shield, Swords, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const competitors = [
  { name: "Crestline AI", share: 22, growth: 14, threat: "High", funding: "$120M" },
  { name: "Nimbus Labs", share: 18, growth: 9, threat: "High", funding: "$84M" },
  { name: "Orbit Intelligence", share: 12, growth: 22, threat: "Medium", funding: "$45M" },
  { name: "Apex Reach", share: 9, growth: 5, threat: "Medium", funding: "$31M" },
  { name: "Volta Signals", share: 7, growth: -3, threat: "Low", funding: "$18M" },
  { name: "Halo Insight", share: 6, growth: 31, threat: "Medium", funding: "$22M" },
];

const positioning = competitors.map((c) => ({
  x: c.share,
  y: c.growth,
  z: 100,
  name: c.name,
}));

const detail = {
  "Crestline AI": {
    strengths: ["Strong enterprise relationships", "Mature compliance suite", "Multi-region deployment"],
    weaknesses: ["Slow product velocity", "Opaque pricing", "Limited self-serve"],
    threats: ["Aggressive sales motion in EMEA", "Pursuing the same Series B accounts"],
  },
  "Nimbus Labs": {
    strengths: ["Beautiful UX", "Strong dev community"],
    weaknesses: ["Limited agent breadth", "No on-prem option"],
    threats: ["Recently raised $40M, hiring sales"],
  },
};

export default function Competitors() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <PageHeader
        title="Competitors"
        description="A live map of competitor positioning, growth and threat level for your target market."
        actions={
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Track competitor
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="surface-card p-6 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Market positioning</h3>
              <p className="text-xs text-muted-foreground">Market share vs YoY growth — bubble size = mindshare</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="x" name="Share" unit="%" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis dataKey="y" name="Growth" unit="%" stroke="var(--color-muted-foreground)" fontSize={11} />
              <ZAxis dataKey="z" range={[80, 240]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }}
              />
              <Scatter data={positioning} fill="var(--color-chart-1)" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="surface-card p-6">
          <h3 className="text-base font-semibold">Share of voice</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={competitors} layout="vertical" margin={{ left: 16 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} width={110} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Bar dataKey="share" fill="var(--color-chart-2)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="surface-card mt-6 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Competitor</TableHead>
              <TableHead>Market share</TableHead>
              <TableHead>YoY growth</TableHead>
              <TableHead>Funding</TableHead>
              <TableHead>Threat</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitors.map((c) => {
              const isOpen = open === c.name;
              const d = detail[c.name as keyof typeof detail];
              return (
                <>
                  <TableRow
                    key={c.name}
                    className="cursor-pointer border-border"
                    onClick={() => setOpen(isOpen ? null : c.name)}
                  >
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.share}%</TableCell>
                    <TableCell className={c.growth >= 0 ? "text-[oklch(0.78_0.17_155)]" : "text-destructive"}>
                      {c.growth >= 0 ? "+" : ""}
                      {c.growth}%
                    </TableCell>
                    <TableCell>{c.funding}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "border-transparent",
                          c.threat === "High" && "bg-destructive/15 text-destructive",
                          c.threat === "Medium" && "bg-[oklch(0.78_0.16_75_/_0.15)] text-[oklch(0.82_0.16_75)]",
                          c.threat === "Low" && "bg-[oklch(0.72_0.17_155_/_0.15)] text-[oklch(0.78_0.17_155)]",
                        )}
                      >
                        {c.threat}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                    </TableCell>
                  </TableRow>
                  {isOpen && d && (
                    <TableRow className="border-border bg-card/40 hover:bg-card/40">
                      <TableCell colSpan={6} className="p-0">
                        <div className="grid gap-4 p-5 md:grid-cols-3">
                          <Panel icon={Shield} title="Strengths" items={d.strengths} tone="success" />
                          <Panel icon={Swords} title="Weaknesses" items={d.weaknesses} tone="warning" />
                          <Panel icon={AlertTriangle} title="Threats" items={d.threats} tone="destructive" />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function Panel({
  icon: Icon,
  title,
  items,
  tone,
}: {
  icon: typeof Shield;
  title: string;
  items: string[];
  tone: "success" | "warning" | "destructive";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon
          className={cn(
            "h-4 w-4",
            tone === "success" && "text-[oklch(0.78_0.17_155)]",
            tone === "warning" && "text-[oklch(0.82_0.16_75)]",
            tone === "destructive" && "text-destructive",
          )}
        />
        <h5 className="text-sm font-semibold">{title}</h5>
      </div>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
