const items = [
  "$0 → $40k MRR in 90 days",
  "8 finds the angle",
  "Revenue, not reach",
  "Built on Stripe",
  "One loop, infinite compounding",
  "Post less. Earn more.",
  "Your content, on autopilot",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-background py-6">
      <div className="flex w-max marquee gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-12 font-display text-3xl tracking-tight">
            <span className={i % 2 ? "text-revenue italic" : "text-foreground"}>{t}</span>
            <span className="text-muted-foreground">∞</span>
          </div>
        ))}
      </div>
    </div>
  );
}
