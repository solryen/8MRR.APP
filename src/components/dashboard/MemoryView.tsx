export function MemoryView() {
  const sections = [
    {
      label: "Product Truth",
      type: "research",
      confidence: "High",
      summary: "Revenue-native content tool for operators who treat every post as a test, not a broadcast.",
      updated: "Today",
      evidence: 1,
    },
    {
      label: "Audience Pain",
      type: "research",
      confidence: "Medium",
      summary: "Posting consistently without seeing any traceable sales impact. Unclear which content angle drives buyers vs. followers.",
      updated: "Today",
      evidence: 1,
    },
    {
      label: "Customer Language",
      type: "research",
      confidence: "Low",
      summary: "No customer language collected yet. Will update after first results.",
      updated: "—",
      evidence: 0,
    },
    {
      label: "Brand Rules",
      type: "user",
      confidence: "Set",
      summary: "3 rules imported from onboarding. No revenue guarantees. No follower-count promises. Direct, outcome-led tone.",
      updated: "Today",
      evidence: 0,
    },
    {
      label: "Competitor Patterns",
      type: "research",
      confidence: "Medium",
      summary: "Fastlane: swipe-first UX, calendar scheduling. LarryLoop: generate-post-track. Motion: creative pattern analytics. Foreplay: inspiration research.",
      updated: "Today",
      evidence: 4,
    },
    {
      label: "Winning Patterns",
      type: "performance",
      confidence: "—",
      summary: "No winning patterns detected yet. Requires at least 5 posts with results.",
      updated: "—",
      evidence: 0,
    },
    {
      label: "Losing Patterns",
      type: "performance",
      confidence: "—",
      summary: "No losing patterns detected yet.",
      updated: "—",
      evidence: 0,
    },
    {
      label: "Claim Boundaries",
      type: "user",
      confidence: "Set",
      summary: "No claims about guaranteed revenue outcomes. Avoid follower-count framing. No ROI promises.",
      updated: "Today",
      evidence: 0,
    },
  ];

  const typeLabel: Record<string, string> = {
    research:    "Research-owned",
    user:        "User-owned",
    performance: "Performance-owned",
  };

  const typeColor: Record<string, string> = {
    research:    "bg-sky-50 border-sky-200 text-sky-700",
    user:        "bg-violet-50 border-violet-200 text-violet-700",
    performance: "bg-emerald-50 border-emerald-200 text-emerald-700",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {sections.map(s => (
        <div key={s.label} className="rounded-2xl border border-border bg-surface/60 paper-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{s.label}</span>
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono ${typeColor[s.type]}`}>
                {typeLabel[s.type]}
              </span>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[10px] font-mono text-muted-foreground">Updated: {s.updated}</div>
              {s.evidence > 0 && (
                <div className="text-[10px] font-mono text-muted-foreground">{s.evidence} evidence</div>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.summary}</p>
          <div className="mt-3 flex gap-2">
            <button className="text-[11px] font-medium text-revenue hover:underline">Edit</button>
            <button className="text-[11px] font-medium text-muted-foreground hover:text-foreground">Lock</button>
            {s.evidence > 0 && (
              <button className="text-[11px] font-medium text-muted-foreground hover:text-foreground">View Evidence</button>
            )}
            <button className="text-[11px] font-medium text-muted-foreground hover:text-foreground">Suggest Update</button>
          </div>
        </div>
      ))}
    </div>
  );
}
