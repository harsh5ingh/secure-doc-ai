import { ArrowLeft, Download, Share2, MoreHorizontal, FileText } from "lucide-react";

export function DocumentHeader({ document, onBack }) {
  const d = document ?? { filename: "Untitled.pdf", size: "—", uploadedAt: "—" };
  return (
    <div className="mb-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to documents
      </button>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl sm:text-2xl font-semibold tracking-tight">{d.filename}</h1>
            <p className="text-xs text-muted-foreground mt-1">
              {d.size} · Uploaded {d.uploadedAt}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-muted/60 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-muted/60 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
