import { useState } from "react";

type Tab = "Generated Carousels" | "Generated Images" | "Uploaded Brand Assets" | "Saved Hooks" | "Captions" | "Exports";

export function AssetsView() {
  const [tab, setTab] = useState<Tab>("Generated Carousels");
  const tabs: Tab[] = ["Generated Carousels", "Generated Images", "Uploaded Brand Assets", "Saved Hooks", "Captions", "Exports"];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition border-b-2 -mb-px ${
                tab === t
                  ? "border-revenue text-revenue"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <Btn>Upload Asset</Btn>
          <Btn>Create Brand Kit</Btn>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-12 w-12 rounded-2xl border border-border bg-surface-elevated flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-muted-foreground">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="M3 16l5-5 4 4 3-3 6 6" />
          </svg>
        </div>
        <div className="text-sm font-medium text-foreground mb-1">{tab}</div>
        <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
          Assets will appear here once you generate your first batch or upload brand files.
        </p>
        <div className="mt-6 flex gap-2">
          <button className="inline-flex items-center rounded-xl bg-revenue px-4 py-2 text-xs font-medium text-revenue-foreground transition hover:opacity-90">
            Generate First Batch
          </button>
          <button className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-elevated">
            Upload Asset
          </button>
        </div>
      </div>
    </div>
  );
}

function Btn({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center rounded-xl border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface-elevated">
      {children}
    </button>
  );
}
