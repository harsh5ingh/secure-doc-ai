import { useCallback, useRef, useState } from "react";
import { FileUp, FilePlus2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadDropzone({ onFilesSelected, accept = "application/pdf" }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback((files) => {
    if (!files || files.length === 0) return;
    onFilesSelected?.(Array.from(files));
  }, [onFilesSelected]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "group relative cursor-pointer rounded-2xl border-2 border-dashed overflow-hidden p-10 sm:p-14 text-center transition-all duration-300 animate-fade-up",
        drag
          ? "border-primary bg-primary/5 scale-[1.005]"
          : "border-border bg-[image:var(--gradient-surface)] hover:border-primary/50",
      )}
    >
      {/* animated glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[140%] rounded-full bg-primary/15 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-primary-glow/10 blur-3xl" />
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="relative">
        <div className={cn(
          "mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)] transition-all duration-500",
          drag ? "scale-110 rotate-3" : "group-hover:scale-105 group-hover:-translate-y-1",
        )}>
          <FilePlus2 className="h-7 w-7 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight mb-2">Drop your PDF here</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Drag and drop, or click to browse. We'll extract clean text on the server and prep it for AI Q&A.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95 transition-all">
            <FileUp className="h-4 w-4" /> Choose file
          </span>
          <span className="text-xs text-muted-foreground">PDF only · up to 25 MB</span>
        </div>
      </div>
    </div>
  );
}
