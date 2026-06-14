import { Shield, Sparkles, Lock, Zap } from "lucide-react";

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="dark min-h-screen w-full bg-background text-foreground grid lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 border-r border-border bg-[image:var(--gradient-surface)] overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary-glow/10 blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">Secure Doc</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">AI</span>
          </div>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground mb-4">
            <Sparkles className="h-3 w-3 text-primary" />
            AI-native document workspace
          </div>
          <h2 className="text-3xl xl:text-4xl font-semibold tracking-tight leading-tight max-w-md">
            Your PDFs, <span className="gradient-text">intelligently</span> organized.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Upload, extract, and search across thousands of documents with end-to-end encryption.
          </p>

          <ul className="mt-8 space-y-3 max-w-md">
            {[
              { icon: Zap, text: "Instant text extraction from any PDF" },
              { icon: Lock, text: "End-to-end encrypted by default" },
              { icon: Sparkles, text: "AI chat with your documents (soon)" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary shrink-0">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Secure Doc AI · All rights reserved
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)]">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Secure Doc AI</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
