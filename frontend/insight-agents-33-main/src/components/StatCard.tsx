import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  icon?: LucideIcon;
  helper?: string;
  className?: string;
}

export function StatCard({ label, value, delta, icon: Icon, helper, className }: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className={cn(
        "surface-card group relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors group-hover:text-primary">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      {(delta !== undefined || helper) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
                positive
                  ? "bg-[oklch(0.72_0.17_155_/_0.15)] text-[oklch(0.78_0.17_155)]"
                  : "bg-destructive/15 text-destructive",
              )}
            >
              {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(delta)}%
            </span>
          )}
          {helper && <span className="text-muted-foreground">{helper}</span>}
        </div>
      )}
    </div>
  );
}
