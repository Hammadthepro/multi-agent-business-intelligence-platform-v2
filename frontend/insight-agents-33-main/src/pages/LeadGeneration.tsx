import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Lead } from "@/types";

const seed: Lead[] = Array.from({ length: 42 }).map((_, i) => {
  const industries = ["FinTech", "HealthTech", "SaaS", "E-commerce", "Manufacturing"];
  const locations = ["NYC, USA", "London, UK", "Berlin, DE", "Singapore", "Toronto, CA", "Sydney, AU"];
  const score = 40 + ((i * 37) % 60);
  const priority: Lead["priority"] = score > 80 ? "High" : score > 60 ? "Medium" : "Low";
  return {
    id: `L-${1000 + i}`,
    name: ["Ava Chen", "Marcus Patel", "Sofia Rossi", "Jonas Weber", "Elena Park", "Liam O'Connor"][i % 6],
    company: ["Acme", "Initech", "Soylent", "Hooli", "Globex", "Stark", "Wayne", "Umbrella"][i % 8] + " " + ["Corp", "Labs", "Inc", "Group"][i % 4],
    industry: industries[i % industries.length],
    location: locations[i % locations.length],
    email: `lead${i}@example.com`,
    score,
    priority,
  };
});

const PAGE = 8;

export default function LeadGeneration() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    return seed.filter((l) => {
      const q = query.toLowerCase();
      const matchesQ =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q);
      const matchesI = industry === "all" || l.industry === industry;
      const matchesP = priority === "all" || l.priority === priority;
      return matchesQ && matchesI && matchesP;
    });
  }, [query, industry, priority]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const pageRows = filtered.slice(page * PAGE, page * PAGE + PAGE);

  return (
    <>
      <PageHeader
        title="Lead Generation"
        description="Qualified leads sourced and scored by the lead generation agent."
        actions={
          <Button className="bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90">
            <Mail className="mr-2 h-4 w-4" />
            Push to outreach
          </Button>
        }
      />

      <div className="surface-card p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              placeholder="Search by name, company, or email"
              className="pl-9"
            />
          </div>
          <Select value={industry} onValueChange={(v) => { setIndustry(v); setPage(0); }}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Industry" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All industries</SelectItem>
              <SelectItem value="FinTech">FinTech</SelectItem>
              <SelectItem value="HealthTech">HealthTech</SelectItem>
              <SelectItem value="SaaS">SaaS</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priority} onValueChange={(v) => { setPriority(v); setPage(0); }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Priority" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon"><SlidersHorizontal className="h-4 w-4" /></Button>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Lead</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length === 0 ? (
                <TableRow className="border-border hover:bg-transparent">
                  <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                    No leads match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                pageRows.map((l) => (
                  <TableRow key={l.id} className="border-border">
                    <TableCell>
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.email}</div>
                    </TableCell>
                    <TableCell>{l.company}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-border">{l.industry}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{l.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-[image:var(--gradient-primary)]"
                            style={{ width: `${l.score}%` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-muted-foreground">{l.score}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "border-transparent",
                          l.priority === "High" && "bg-destructive/15 text-destructive",
                          l.priority === "Medium" && "bg-[oklch(0.78_0.16_75_/_0.15)] text-[oklch(0.82_0.16_75)]",
                          l.priority === "Low" && "bg-secondary text-secondary-foreground",
                        )}
                      >
                        {l.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {pageRows.length} of {filtered.length} leads
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-2 tabular-nums">
              {page + 1} / {pages}
            </span>
            <Button variant="outline" size="icon" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
