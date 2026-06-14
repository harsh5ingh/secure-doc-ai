import { useState } from "react";
import { FileText, Search, Download, Eye, Trash2, Sparkles } from "lucide-react";

export function RecentDocumentsTable({ documents, onOpen, onDelete }) {
  const [query, setQuery] = useState("");
  const docs = documents ?? [];
  const filtered = docs.filter((d) => d.filename?.toLowerCase().includes(query.toLowerCase()));
  const isEmpty = filtered.length === 0;

  return (
    <section className="animate-fade-up" style={{ animationDelay: "120ms" }}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:items-center sm:justify-between mb-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight">Your documents</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{docs.length} {docs.length === 1 ? "file" : "files"}</p>
        </div>
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter..."
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {isEmpty ? (
        <div className="rounded-2xl border border-border bg-card p-14 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary animate-pulse">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-base font-semibold mb-1">No documents yet</h3>
          <p className="text-sm text-muted-foreground">Upload your first PDF to see it here.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="text-left font-medium px-5 py-3">Name</th>
                  <th className="text-left font-medium px-5 py-3 hidden md:table-cell">Size</th>
                  <th className="text-left font-medium px-5 py-3 hidden lg:table-cell">Pages</th>
                  <th className="text-left font-medium px-5 py-3">Uploaded</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr
                    key={d.id ?? i}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className="animate-fade-up border-b border-border last:border-0 hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-5 py-3">
                      <button onClick={() => onOpen?.(d)} className="flex items-center gap-3 text-left">
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0 transition-transform group-hover:scale-110">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-medium truncate max-w-[260px] group-hover:text-primary transition-colors">
                          {d.filename}
                        </span>
                      </button>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{d.size}</td>
                    <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">{d.pages}</td>
                    <td className="px-5 py-3 text-muted-foreground">{d.uploadedAt}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onOpen?.(d)} className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Download className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => onDelete?.(d)} className="grid h-7 w-7 place-items-center rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
