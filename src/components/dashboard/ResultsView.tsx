export function ResultsView() {
  const patterns = [
    { label: "Best Hook",        value: "Pain confession opener", score: "—", confidence: "No data yet" },
    { label: "Best Pain Angle",  value: "—",                      score: "—", confidence: "No data yet" },
    { label: "Best CTA",         value: "—",                      score: "—", confidence: "No data yet" },
    { label: "Best Visual Style",value: "—",                      score: "—", confidence: "No data yet" },
    { label: "Worst Pattern",    value: "—",                      score: "—", confidence: "No data yet" },
  ];

  const columns = [
    "Creative", "Platform", "Views", "Comments", "Saves",
    "Link Clicks", "Revenue", "Intent Score", "Decision",
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {patterns.map(p => (
          <div key={p.label} className="rounded-2xl border border-border bg-surface/60 paper-card p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">{p.label}</div>
            <div className="text-xs font-semibold text-foreground mb-0.5">{p.value}</div>
            <div className="text-[10px] text-muted-foreground">{p.confidence}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface/60 paper-card overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border">
          <div className="text-sm font-semibold text-foreground">Scoreboard</div>
          <div className="flex flex-wrap gap-2">
            <FilterBtn>Date Range</FilterBtn>
            <FilterBtn>Platform</FilterBtn>
            <FilterBtn>Batch</FilterBtn>
            <FilterBtn primary>Generate From Winners</FilterBtn>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-elevated/50">
                {columns.map(c => (
                  <th key={c} className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground text-xs">
                  No results yet. Post your first batch and add results to see the scoreboard.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FilterBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      className={`inline-flex items-center rounded-xl px-3 py-1.5 text-[11px] font-medium transition ${
        primary
          ? "bg-revenue text-revenue-foreground hover:opacity-90"
          : "border border-border bg-background text-foreground hover:bg-surface-elevated"
      }`}
    >
      {children}
    </button>
  );
}
