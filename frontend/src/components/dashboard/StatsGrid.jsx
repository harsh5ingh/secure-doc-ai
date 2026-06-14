import { FileText, HardDrive, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

function StatCard({ label, value, hint, hintTone = "default", icon: Icon, index = 0 }) {
  return (
    <div
      style={{ animationDelay: `${index * 80}ms` }}
      className="animate-fade-up hover-lift group relative overflow-hidden rounded-xl border border-border bg-card p-5"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        {Icon && (
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="text-3xl font-semibold tracking-tight tabular-nums mb-2">{value}</div>
      {hint && (
        <div className={cn(
          "inline-flex items-center gap-1 text-[11px] font-medium",
          hintTone === "success" && "text-[oklch(0.78_0.17_155)]",
          hintTone === "muted" && "text-muted-foreground",
          hintTone === "default" && "text-muted-foreground",
        )}>
          {hintTone === "success" && <TrendingUp className="h-3 w-3" />}
          {hint}
        </div>
      )}
    </div>
  );
}

export function StatsGrid({ stats }) {
  const data = stats ?? [
    { label: "Total Documents", value: "0", hint: "+12% this week", hintTone: "success", icon: FileText },
    { label: "Storage Used", value: "0 KB", hint: "of 5 GB plan", hintTone: "muted", icon: HardDrive },
    { label: "Last Upload", value: "—", hint: "Synced", hintTone: "success", icon: Clock },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
    </div>
  );
}
