import { Sparkles, Lock, ArrowUp } from "lucide-react";

export function AIChatPlaceholder() {
  const prompts = [
    "Summarize this document in 3 bullets",
    "Extract all key dates and amounts",
    "What are the main risks mentioned?",
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-[image:var(--gradient-surface)] p-6 sm:p-8 mt-6">
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-base font-semibold flex items-center gap-2">
                Ask AI about this document
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                  <Lock className="h-2.5 w-2.5" /> Coming soon
                </span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Chat with your PDF using natural language</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {prompts.map((p) => (
            <button
              key={p}
              disabled
              className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground cursor-not-allowed opacity-70"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 p-2 opacity-70">
          <input
            disabled
            placeholder="AI chat will be available soon…"
            className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none cursor-not-allowed"
          />
          <button disabled className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)] opacity-60 cursor-not-allowed">
            <ArrowUp className="h-4 w-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
