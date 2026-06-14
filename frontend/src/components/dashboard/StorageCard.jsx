import { HardDrive } from "lucide-react";

export function StorageCard({ used = 8.2, total = 20, breakdown }) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  const items = breakdown ?? [
    { label: "Documents", value: "6.4 GB", color: "oklch(0.62 0.22 274)" },
    { label: "Extractions", value: "1.5 GB", color: "oklch(0.72 0.2 285)" },
    { label: "Other", value: "0.3 GB", color: "oklch(0.5 0.1 275)" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">Storage</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{used} GB of {total} GB used</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
          <HardDrive className="h-4 w-4" />
        </div>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted mb-2">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--gradient-primary)] transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-muted-foreground mb-5">
        <span>{pct}% used</span>
        <span>{(total - used).toFixed(1)} GB free</span>
      </div>

      <div className="space-y-2.5">
        {items.map((i) => (
          <div key={i.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: i.color }} />
              <span className="text-muted-foreground">{i.label}</span>
            </div>
            <span className="font-medium tabular-nums">{i.value}</span>
          </div>
        ))}
      </div>

      <button className="mt-5 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-muted/60 hover:border-primary/40 transition-colors">
        Manage storage
      </button>
    </div>
  );
}
