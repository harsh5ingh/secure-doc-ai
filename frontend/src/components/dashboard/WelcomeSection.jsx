import { Upload } from "lucide-react";

export function WelcomeSection({ name = "dj", onNewUpload }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between mb-8 animate-fade-up">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-2">Workspace</p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Welcome back, <span className="gradient-text">{name}</span>
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Upload PDFs, extract text, and prepare them for AI-powered analysis.
        </p>
      </div>
      <button
        onClick={onNewUpload}
        className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <Upload className="h-4 w-4" />
        <span className="hidden sm:inline">New upload</span>
      </button>
    </div>
  );
}
