import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Brain,
  Copy,
  RefreshCw,
  Check,
  FileText,
  ListChecks,
  MessageCircleQuestion,
  NotebookPen,
  HelpCircle,
  Zap,
} from "lucide-react";

const LOADING_MESSAGES = [
  "Analyzing document structure...",
  "Extracting key insights...",
  "Understanding document context...",
  "Generating AI summary...",
  "Refining the response...",
];

const SUGGESTED_ACTIONS = [
  { id: "summary", label: "Generate Summary", icon: FileText },
  { id: "keypoints", label: "Extract Key Points", icon: ListChecks },
  { id: "ask", label: "Ask Questions", icon: MessageCircleQuestion },
  { id: "notes", label: "Create Study Notes", icon: NotebookPen },
  { id: "quiz", label: "Generate Quiz", icon: HelpCircle },
];

const DEMO_SUMMARY = `This document outlines the core themes, supporting evidence, and actionable takeaways extracted from your upload.

• Establishes the central problem and its real-world context
• Highlights three supporting arguments with concrete examples
• Concludes with recommended next steps and open questions

Use this as a quick orientation before diving into the full text.`;

export function AIChatPlaceholder() {
  // state: "empty" | "loading" | "result"
  const [state, setState] = useState("empty");
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState("");
  const [generatedAt, setGeneratedAt] = useState(null);
  const [copied, setCopied] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (state !== "loading") return;
    setMsgIndex(0);
    setProgress(0);
    const msgInt = setInterval(
      () => setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length),
      1600
    );
    const progInt = setInterval(() => {
      setProgress((p) => (p >= 95 ? 95 : p + Math.random() * 6 + 2));
    }, 220);
    return () => {
      clearInterval(msgInt);
      clearInterval(progInt);
    };
  }, [state]);

  const startGenerate = () => {
    clearTimers();
    setState("loading");
    const t = setTimeout(() => {
      setSummary(DEMO_SUMMARY);
      setGeneratedAt(new Date());
      setProgress(100);
      setState("result");
    }, 3600);
    timers.current.push(t);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section className="relative mt-8">
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl animate-ai-orb-a" />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl animate-ai-orb-b" />
        <div className="absolute top-1/3 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl animate-ai-aurora" />
      </div>

      <div className="relative rounded-3xl p-[1.5px] overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-[conic-gradient(from_0deg,theme(colors.fuchsia.500/.6),theme(colors.cyan.400/.6),theme(colors.indigo.500/.6),theme(colors.fuchsia.500/.6))] animate-ai-border-spin" />
        <div className="relative rounded-3xl bg-background/70 backdrop-blur-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-cyan-400 blur-md opacity-70 animate-ai-pulse-glow" />
                <div className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-cyan-400 shadow-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight flex items-center gap-2">
                  AI Assistant
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500/15 to-cyan-400/15 border border-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/80">
                    <Sparkles className="h-2.5 w-2.5" /> Powered by AI
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Smart insights, instantly generated from your document
                </p>
              </div>
            </div>
            {state === "result" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/70 px-3 py-1.5 text-xs hover:bg-card transition"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={startGenerate}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-3 py-1.5 text-xs font-medium text-white shadow hover:opacity-90 transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                </button>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-5 sm:p-7">
            {state === "empty" && <EmptyState onAction={startGenerate} />}
            {state === "loading" && (
              <LoadingState message={LOADING_MESSAGES[msgIndex]} progress={progress} />
            )}
            {state === "result" && (
              <ResultState summary={summary} generatedAt={generatedAt} />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ai-border-spin { to { transform: rotate(360deg); } }
        .animate-ai-border-spin { animation: ai-border-spin 8s linear infinite; }

        @keyframes ai-pulse-glow {
          0%, 100% { opacity: .55; transform: scale(1); }
          50% { opacity: .95; transform: scale(1.08); }
        }
        .animate-ai-pulse-glow { animation: ai-pulse-glow 2.4s ease-in-out infinite; }

        @keyframes ai-orb-a {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,20px) scale(1.1); }
        }
        @keyframes ai-orb-b {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-25px,-15px) scale(1.05); }
        }
        @keyframes ai-aurora {
          0%, 100% { opacity: .6; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -10px) scale(1.05); }
        }
        .animate-ai-orb-a { animation: ai-orb-a 9s ease-in-out infinite; }
        .animate-ai-orb-b { animation: ai-orb-b 11s ease-in-out infinite; }
        .animate-ai-aurora { animation: ai-aurora 7s ease-in-out infinite; }

        @keyframes ai-shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .ai-shimmer {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.04) 0%,
            rgba(255,255,255,0.18) 50%,
            rgba(255,255,255,0.04) 100%);
          background-size: 800px 100%;
          animation: ai-shimmer 1.6s linear infinite;
        }

        @keyframes ai-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: .4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .ai-dot { animation: ai-dot 1.2s ease-in-out infinite; }

        @keyframes ai-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ai-fade-up { animation: ai-fade-up .5s ease-out both; }

        @keyframes ai-msg-in {
          from { opacity: 0; transform: translateY(6px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .ai-msg-in { animation: ai-msg-in .45s ease-out both; }
      `}</style>
    </section>
  );
}

function EmptyState({ onAction }) {
  return (
    <div className="ai-fade-up">
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-fuchsia-400" /> AI ready
        </div>
        <h4 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Ready to analyze your document
        </h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose an action below — your AI assistant will read the document and generate a polished response in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SUGGESTED_ACTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={onAction}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-4 text-left transition hover:border-fuchsia-400/40 hover:bg-card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 via-cyan-400/0 to-indigo-500/0 group-hover:from-fuchsia-500/10 group-hover:via-cyan-400/10 group-hover:to-indigo-500/10 transition" />
            <div className="relative flex items-start gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-fuchsia-500/20 to-cyan-400/20 text-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  One click. Instant insight.
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LoadingState({ message, progress }) {
  return (
    <div className="ai-fade-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-400 blur-md opacity-70 animate-ai-pulse-glow" />
          <div className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-400">
            <Brain className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div key={message} className="ai-msg-in text-sm font-medium truncate">
            {message}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Thinking</span>
            <span className="inline-flex gap-0.5">
              <span className="ai-dot inline-block h-1 w-1 rounded-full bg-foreground/60" />
              <span
                className="ai-dot inline-block h-1 w-1 rounded-full bg-foreground/60"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="ai-dot inline-block h-1 w-1 rounded-full bg-foreground/60"
                style={{ animationDelay: "0.3s" }}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-border/60 mb-6">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skeleton */}
      <div className="space-y-3">
        {[100, 92, 80, 96, 70].map((w, i) => (
          <div
            key={i}
            className="ai-shimmer h-3 rounded-md"
            style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="ai-shimmer h-16 rounded-xl" />
          <div className="ai-shimmer h-16 rounded-xl" />
          <div className="ai-shimmer h-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ResultState({ summary, generatedAt }) {
  const ts = generatedAt
    ? generatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";
  return (
    <div className="ai-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 border border-white/10 px-2.5 py-1 text-[11px] font-medium">
          <Sparkles className="h-3 w-3" /> AI Generated
        </span>
        {ts && (
          <span className="text-xs text-muted-foreground">Generated at {ts}</span>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card/70 p-5 sm:p-6 leading-relaxed text-sm whitespace-pre-wrap">
        {summary}
      </div>
    </div>
  );
}
