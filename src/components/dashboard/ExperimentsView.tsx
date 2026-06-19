import { useState } from "react";

type Tab = "Drafts" | "Approved" | "Posted" | "Needs Results" | "Completed";

export function ExperimentsView() {
  const [tab, setTab] = useState<Tab>("Drafts");
  const tabs: Tab[] = ["Drafts", "Approved", "Posted", "Needs Results", "Completed"];

  const batches = [
    {
      name: "First Batch — Pain-led",
      date: "Today",
      goal: "Sales",
      hypothesis: "Pain-confession hooks drive more link clicks than outcome-led openers.",
      count: 10,
      status: "Draft",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-medium transition border-b-2 -mb-px ${
              tab === t
                ? "border-revenue text-revenue"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Drafts" ? (
        <div className="space-y-4">
          {batches.map((b, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface/60 paper-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-foreground">{b.name}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{b.date} · Goal: {b.goal} · {b.count} carousels</div>
                </div>
                <span className="shrink-0 inline-flex items-center rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                  {b.status}
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed italic">"{b.hypothesis}"</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Btn primary>Open Batch</Btn>
                <Btn>Add Results</Btn>
                <Btn>Generate Variant Batch</Btn>
                <Btn>Archive</Btn>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyTab label={tab} />
      )}
    </div>
  );
}

function EmptyTab({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-10 w-10 rounded-xl border border-border bg-surface-elevated flex items-center justify-center mb-4">
        <span className="text-muted-foreground text-lg">○</span>
      </div>
      <div className="text-sm font-medium text-foreground mb-1">No {label.toLowerCase()} yet</div>
      <div className="text-xs text-muted-foreground">Items will appear here once you have {label.toLowerCase()} experiments.</div>
    </div>
  );
}

function Btn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      className={`inline-flex items-center rounded-xl px-3.5 py-1.5 text-xs font-medium transition ${
        primary
          ? "bg-revenue text-revenue-foreground hover:opacity-90"
          : "border border-border bg-background text-foreground hover:bg-surface-elevated"
      }`}
    >
      {children}
    </button>
  );
}
