import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Bot,
  Copy,
  Sparkles,
  Brain,
  RefreshCw,
  Type,
  Hash,
  Clock,
  Calendar,
  FileIcon,
  ListChecks,
  MessageCircleQuestion,
  NotebookPen,
  HelpCircle,
  Wand2,
} from "lucide-react";
import { toast } from "react-toastify";

const LOADING_MESSAGES = [
  "Analyzing document structure...",
  "Extracting key insights...",
  "Understanding document context...",
  "Generating AI summary...",
];

function DocumentPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [document, setDocument] = useState(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/auth/documents/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDocument(response.data.document);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocument();
  }, [id]);

  useEffect(() => {
    if (!loadingSummary) return;
    setLoadingMessageIndex(0);
    const interval = setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [loadingSummary]);

  const StyleTag = () => (
    <style>{`
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes orb-float { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-30px) scale(1.1); } }
      @keyframes border-spin { to { transform: rotate(360deg); } }
      .ai-shimmer { background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%); background-size: 200% 100%; animation: shimmer 1.8s infinite; }
      .ai-orb { animation: orb-float 8s ease-in-out infinite; }
      .ai-border::before {
        content:""; position:absolute; inset:-2px; border-radius: inherit;
        background: conic-gradient(from 0deg, transparent 0%, hsl(var(--primary) / 0.8) 25%, transparent 50%, hsl(var(--primary) / 0.6) 75%, transparent 100%);
        animation: border-spin 4s linear infinite; z-index: 0;
      }
      .ai-border > * { position: relative; z-index: 1; }
      .scroll-fade { mask-image: linear-gradient(180deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%); }
    `}</style>
  );

  if (!document) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        
        <div className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-pulse" />
              <div className="relative h-10 w-10 rounded-full bg-primary/20 grid place-items-center">
                <FileText className="h-5 w-5 text-primary animate-pulse" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Loading document...</p>
          </div>
          <div className="space-y-3">
            <div className="h-3 rounded-full bg-muted/50 ai-shimmer" />
            <div className="h-3 w-5/6 rounded-full bg-muted/50 ai-shimmer" />
            <div className="h-3 w-4/6 rounded-full bg-muted/50 ai-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  const wordCount = document?.content?.trim()?.split(/\s+/).length || 0;
  const charCount = document?.content?.length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const generateSummary = () => {
    setLoadingSummary(true);
    setTimeout(() => {
      setSummary(document.content?.split(" ").slice(0, 80).join(" ") + "...");
      setLoadingSummary(false);
    }, 1000);
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary || "");
    toast.success("Summary copied");
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <StyleTag />

      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-primary/20 blur-3xl ai-orb" />
        <div className="absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl ai-orb" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-3xl ai-orb" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="shrink-0 flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">Document</p>
              <h1 className="truncate text-base sm:text-xl lg:text-2xl font-semibold leading-tight">
                {document.filename}
              </h1>
            </div>
          </div>
          <div className="shrink-0 hidden sm:flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI Ready
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
        <div className="grid gap-5 lg:gap-6 lg:grid-cols-3">
          {/* PDF Preview */}
          <section className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-xl shadow-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <FileIcon className="h-4 w-4 text-primary" />
                PDF Preview
              </h2>
              <span className="rounded-full bg-muted/60 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">PDF</span>
            </div>
            <div className="p-3">
              <iframe
                src={`http://localhost:3000/${document.pdf_url}`}
                title="PDF Preview"
                className="w-full h-[480px] md:h-[640px] lg:h-[760px] rounded-xl bg-muted/30"
              />
            </div>
          </section>

          {/* Extracted Text */}
          <section className="lg:col-span-2 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-xl shadow-black/5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-6 py-4 border-b border-border/40">
              <h2 className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">Extracted Text</span>
              </h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(document.content || "");
                  toast.success("Copied to clipboard");
                }}
                className="shrink-0 flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-xs sm:text-sm hover:bg-muted/60 hover:border-primary/40 transition-colors"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="scroll-fade max-h-[520px] lg:max-h-[680px] overflow-y-auto rounded-xl bg-muted/20 border border-border/30 p-4 sm:p-5">
                <pre className="whitespace-pre-wrap text-sm leading-7 font-mono text-foreground/90">
                  {document.content}
                </pre>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-3 grid gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-2">
            {/* Document Details */}
            <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl shadow-black/5">
              <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold">
                <FileIcon className="h-4 w-4 text-primary" />
                Document Details
              </h3>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                {[
                  { icon: Type, label: "Words", value: wordCount.toLocaleString() },
                  { icon: Hash, label: "Chars", value: charCount.toLocaleString() },
                  { icon: Clock, label: "Min", value: readingTime },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/40 bg-background/40 p-3 text-center">
                    <s.icon className="mx-auto h-3.5 w-3.5 text-primary/70 mb-1.5" />
                    <p className="text-base sm:text-lg font-semibold leading-none">{s.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-border/40 pt-4">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                  <FileText className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">File name</p>
                    <p className="font-medium break-all">{document.filename}</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                  <Calendar className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Uploaded</p>
                    <p className="font-medium">
                      {document.created_at
                        ? new Date(document.created_at).toLocaleString("en-IN")
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant — hero panel */}
            <div className="relative">
              {/* Floating orbs behind */}
              <div className="pointer-events-none absolute -inset-6 -z-10">
                <div className="absolute top-0 left-1/4 h-40 w-40 rounded-full bg-primary/30 blur-3xl ai-orb" />
                <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl ai-orb" style={{ animationDelay: "3s" }} />
              </div>

              <div className="ai-border relative rounded-2xl overflow-hidden">
                <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl shadow-primary/10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-primary/40 blur-md animate-pulse" />
                        <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 grid place-items-center">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold leading-none">AI Assistant</h3>
                        <p className="text-[10px] text-muted-foreground mt-1">Powered by intelligence</p>
                      </div>
                    </div>
                    <span className="hidden sm:flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      Online
                    </span>
                  </div>

                  {/* States */}
                  {loadingSummary ? (
                    /* LOADING */
                    <div className="animate-in fade-in duration-300">
                      <div className="flex flex-col items-center text-center py-3">
                        <div className="relative mb-4">
                          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                          <span className="absolute -inset-2 rounded-full bg-primary/20 animate-ping" style={{ animationDelay: "0.3s" }} />
                          <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-primary via-primary/80 to-fuchsia-500/60 grid place-items-center shadow-lg shadow-primary/40">
                            <Brain className="h-6 w-6 text-primary-foreground" />
                          </div>
                        </div>
                        <p key={loadingMessageIndex} className="text-sm font-medium animate-in fade-in slide-in-from-bottom-1 duration-500">
                          {LOADING_MESSAGES[loadingMessageIndex]}
                        </p>
                        <div className="flex gap-1 mt-3">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 space-y-2.5">
                        <div className="h-3 rounded-full bg-muted/50 ai-shimmer" />
                        <div className="h-3 w-11/12 rounded-full bg-muted/50 ai-shimmer" />
                        <div className="h-3 w-9/12 rounded-full bg-muted/50 ai-shimmer" />
                        <div className="h-3 w-10/12 rounded-full bg-muted/50 ai-shimmer" />
                        <div className="h-3 w-7/12 rounded-full bg-muted/50 ai-shimmer" />
                      </div>

                      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-muted/40">
                        <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent ai-shimmer" />
                      </div>
                    </div>
                  ) : summary ? (
                    /* RESULT */
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 to-fuchsia-500/20 border border-primary/30 px-2.5 py-1 text-[10px] font-medium text-primary">
                          <Sparkles className="h-3 w-3" />
                          AI Generated
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>

                      <div className="rounded-xl border border-border/40 bg-background/40 p-4 text-sm leading-7 text-foreground/90">
                        {summary}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button
                          onClick={copySummary}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs font-medium hover:bg-muted/60 hover:border-primary/40 transition-colors"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </button>
                        <button
                          onClick={generateSummary}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          Regenerate
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* EMPTY */
                    <div className="animate-in fade-in duration-300">
                      <div className="flex flex-col items-center text-center py-2">
                        <div className="relative mb-3">
                          <span className="absolute inset-0 rounded-full bg-primary/20 blur-lg animate-pulse" />
                          <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/80 to-fuchsia-500/60 grid place-items-center shadow-lg shadow-primary/30">
                            <Wand2 className="h-5 w-5 text-primary-foreground" />
                          </div>
                        </div>
                        <h4 className="text-sm font-semibold">Ready to analyze your document</h4>
                        <p className="mt-1 text-xs text-muted-foreground max-w-[260px]">
                          Pick a quick action below or generate a smart summary.
                        </p>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        {[
                          { icon: Sparkles, label: "Generate Summary", action: generateSummary, primary: true },
                          { icon: ListChecks, label: "Key Points" },
                          { icon: MessageCircleQuestion, label: "Ask Questions" },
                          { icon: NotebookPen, label: "Study Notes" },
                          { icon: HelpCircle, label: "Generate Quiz" },
                        ].map((a) => (
                          <button
                            key={a.label}
                            onClick={a.action}
                            disabled={!a.action}
                            title={a.action ? "" : "Coming soon"}
                            className={`group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs transition-all ${
                              a.primary
                                ? "col-span-2 border-primary/40 bg-gradient-to-r from-primary/15 to-fuchsia-500/10 hover:from-primary/25 hover:to-fuchsia-500/20 text-foreground"
                                : "border-border/50 bg-background/40 hover:border-primary/30 hover:bg-muted/40 text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
                            }`}
                          >
                            <a.icon className={`h-3.5 w-3.5 shrink-0 ${a.primary ? "text-primary" : ""}`} />
                            <span className="truncate font-medium">{a.label}</span>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={generateSummary}
                        disabled={loadingSummary}
                        className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        Generate Summary
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default DocumentPage;