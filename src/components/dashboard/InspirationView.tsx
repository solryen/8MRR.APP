export function InspirationView() {
  const cards = [
    { platform: "TikTok",     views: "284K", likes: "18.4K", comments: "1.2K", saves: "9.1K", pattern: "Mistake Correction", intent: 82, freshness: "2d ago" },
    { platform: "Instagram",  views: "173K", likes: "12.1K", comments: "890",  saves: "7.4K", pattern: "Outcome-led",         intent: 76, freshness: "4d ago" },
    { platform: "Instagram",  views: "91K",  likes: "6.8K",  comments: "640",  saves: "5.2K", pattern: "Pain Confession",     intent: 71, freshness: "5d ago" },
    { platform: "TikTok",     views: "512K", likes: "41K",   comments: "3.1K", saves: "14K",  pattern: "Trend-Pattern Remix", intent: 44, freshness: "1d ago" },
    { platform: "Facebook",   views: "38K",  likes: "2.4K",  comments: "310",  saves: "1.1K", pattern: "Comparison",          intent: 68, freshness: "3d ago" },
    { platform: "YouTube",    views: "67K",  likes: "4.2K",  comments: "480",  saves: "2.9K", pattern: "Founder Story",       intent: 61, freshness: "6d ago" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-5 flex flex-wrap gap-2">
        <FilterBtn>Refresh Trends</FilterBtn>
        <FilterBtn>Add Competitor</FilterBtn>
        <FilterBtn>Filter Platform</FilterBtn>
        <FilterBtn>Filter Pattern</FilterBtn>
        <FilterBtn primary>Sort: Commercial Intent</FilterBtn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface/60 paper-card overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-surface-elevated to-background border-b border-border flex items-center justify-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{c.platform} · {c.freshness}</span>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="inline-flex items-center rounded-full bg-revenue/10 border border-revenue/20 px-2 py-0.5 text-[10px] font-mono text-revenue font-medium">
                  {c.pattern}
                </span>
                <div className="text-right">
                  <div className="text-xs font-semibold text-foreground">{c.intent}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">intent</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { label: "Views",    value: c.views },
                  { label: "Likes",    value: c.likes },
                  { label: "Comments", value: c.comments },
                  { label: "Saves",    value: c.saves },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-xs font-semibold text-foreground font-mono">{s.value}</div>
                    <div className="text-[9px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-1.5">
                <button className="flex-1 rounded-lg bg-revenue text-revenue-foreground text-[11px] font-medium py-1.5 transition hover:opacity-90">Use Pattern</button>
                <button className="rounded-lg border border-border bg-background text-[11px] font-medium px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground">Save</button>
                <button className="rounded-lg border border-border bg-background text-[11px] font-medium px-2.5 py-1.5 text-muted-foreground transition hover:text-foreground">Ignore</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      className={`inline-flex items-center rounded-xl px-3.5 py-1.5 text-xs font-medium transition ${
        primary
          ? "bg-revenue text-revenue-foreground hover:opacity-90"
          : "border border-border bg-surface text-foreground hover:bg-surface-elevated"
      }`}
    >
      {children}
    </button>
  );
}
