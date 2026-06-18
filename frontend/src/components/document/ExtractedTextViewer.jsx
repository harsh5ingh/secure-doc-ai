import { useState } from "react";
import { Copy, Check, Search } from "lucide-react";

const sample = `Q4 Financial Report — Executive Summary

This document summarizes the Q4 performance across all business units. Revenue grew 18.4% year-over-year, driven by strong adoption in the enterprise segment and expansion into EMEA markets.

Key highlights:
• Total revenue: $42.8M (+18.4% YoY)
• Net new ARR: $11.2M (+22% QoQ)
• Gross margin: 78.2%
• Customer count: 1,284 (+127 net new)

Operational efficiency improved meaningfully this quarter. The introduction of the new document intelligence platform reduced manual processing time by an average of 64% across customer accounts...`;

export function ExtractedTextViewer({ text }) {
  const [copied, setCopied] = useState(false);
  const content = text ?? sample;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold">Extracted Text</h3>
          <p className="text-xs text-muted-foreground mt-0.5">AI-parsed content from your PDF</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search in text…"
              className="h-8 w-48 rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium hover:bg-muted/60 transition-colors"
          >
            {copied ? <><Check className="h-3 w-3 text-[oklch(0.78_0.17_155)]" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
          </button>
        </div>
      </div>
      <div className="max-h-[520px] overflow-y-auto p-6">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-foreground/90">
          {content}
        </pre>
      </div>
    </div>
  );
}
