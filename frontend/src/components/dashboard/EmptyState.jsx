import { FileText, UploadCloud } from "lucide-react";

export function EmptyState({ title = "No documents yet", description = "Upload your first PDF to get started with AI-powered extraction.", actionLabel = "Upload PDF", onAction }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">{description}</p>
      <button
        onClick={onAction}
        className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        <UploadCloud className="h-4 w-4" />
        {actionLabel}
      </button>
    </div>
  );
}
