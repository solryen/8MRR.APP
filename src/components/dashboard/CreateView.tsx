export function CreateView() {
  const angles = [
    { type: "Pain-led",           hook: "Nobody talks about how much posting costs you when it doesn't convert.", angle: "Pain confession", cta: "Here's what changed when I started measuring.", signal: "Profile visits / link clicks" },
    { type: "Outcome-led",        hook: "I went from 200 followers to 3 paying customers in 30 days. Here's the system.", angle: "Outcome proof", cta: "Link in bio for the exact framework.", signal: "Saves / link clicks" },
    { type: "Mistake-correction", hook: "You're not posting wrong content. You're posting without knowing what moves people to buy.", angle: "Reframe", cta: "Follow for the revenue-loop method.", signal: "Comments / shares" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap gap-2">
        <ActionBtn primary>Generate Recommended Batch</ActionBtn>
        <ActionBtn>Generate From Inspiration</ActionBtn>
        <ActionBtn>Generate More Like Winner</ActionBtn>
        <ActionBtn>Test One Variable</ActionBtn>
        <ActionBtn>Manual Create</ActionBtn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {angles.map((a, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface/60 paper-card overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-surface-elevated to-background border-b border-border flex items-center justify-center">
              <div className="text-center px-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">{a.type}</span>
                <p className="text-xs font-medium text-foreground leading-relaxed line-clamp-3">"{a.hook}"</p>
              </div>
            </div>

            <div className="p-4 space-y-2.5">
              <InfoRow label="Angle"   value={a.angle} />
              <InfoRow label="CTA"     value={a.cta} />
              <InfoRow label="Signal"  value={a.signal} />

              <div className="pt-1 flex flex-wrap gap-1.5">
                <SmBtn primary>Approve</SmBtn>
                <SmBtn>Skip</SmBtn>
                <SmBtn>Edit Text</SmBtn>
                <SmBtn>Generate Variant</SmBtn>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-surface/60 paper-card p-5">
        <div className="text-xs font-semibold text-foreground mb-3">Intelligence Panel</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Inspired by",      value: "TikTok · Mistake Correction · 284K views" },
            { label: "Pattern",          value: "Pain confession / reframe" },
            { label: "What this tests",  value: "Hook strength + CTA clarity" },
            { label: "Expected signal",  value: "Profile visits + link clicks" },
          ].map(r => (
            <div key={r.label}>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{r.label}</div>
              <div className="text-xs text-foreground">{r.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}: </span>
      <span className="text-[11px] text-foreground">{value}</span>
    </div>
  );
}

function ActionBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      className={`inline-flex items-center rounded-xl px-4 py-2 text-xs font-medium transition ${
        primary
          ? "bg-revenue text-revenue-foreground hover:opacity-90"
          : "border border-border bg-surface text-foreground hover:bg-surface-elevated"
      }`}
    >
      {children}
    </button>
  );
}

function SmBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
        primary
          ? "bg-revenue text-revenue-foreground hover:opacity-90"
          : "border border-border bg-background text-foreground hover:bg-surface-elevated"
      }`}
    >
      {children}
    </button>
  );
}
