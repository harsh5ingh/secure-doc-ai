import { Calendar, HardDrive, FileType2, Hash, ShieldCheck } from "lucide-react";

export function DocumentDetailsCard({ document }) {
  const d = document ?? {};
  const rows = [
    { icon: FileType2, label: "Type", value: d.type ?? "PDF Document" },
    { icon: HardDrive, label: "Size", value: d.size ?? "2.4 MB" },
    { icon: Hash, label: "Pages", value: d.pages ?? "24" },
    { icon: Calendar, label: "Uploaded", value: d.uploadedAt ?? "Today, 10:42 AM" },
    { icon: ShieldCheck, label: "Status", value: d.status ?? "Processed" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold mb-4">Document Details</h3>
      <dl className="space-y-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </dt>
            <dd className="font-medium text-right truncate ml-2">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 pt-5 border-t border-border">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Security</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.17_155)]" />
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
