import { Link } from "@tanstack/react-router";

const tiers = [
  {
    name: "Solo",
    price: "$49",
    sub: "/ month",
    desc: "For creators ready to make every post earn its keep.",
    features: ["1 brand voice", "3 channels", "Stripe attribution", "Weekly revenue brief"],
    cta: "Start free",
  },
  {
    name: "Operator",
    price: "$149",
    sub: "/ month",
    desc: "For founders running content as a real revenue line.",
    features: [
      "3 brand voices",
      "Unlimited channels",
      "Advanced loop tuning",
      "A/B angle testing",
      "Priority support",
    ],
    cta: "Start the loop",
    featured: true,
  },
  {
    name: "Studio",
    price: "Custom",
    sub: "",
    desc: "For teams running content for multiple brands or clients.",
    features: ["Unlimited brands", "Team seats", "API + webhooks", "Dedicated strategist"],
    cta: "Talk to us",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-revenue">
            Pricing
          </div>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] tracking-[-0.025em] md:text-6xl">
            Pays for itself in one good post.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl border p-8 transition ${
                t.featured
                  ? "border-revenue bg-surface text-foreground glow-revenue"
                  : "border-border bg-surface/40 hover:bg-surface"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-8 rounded-full bg-revenue px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-revenue-foreground">
                  Most loops
                </div>
              )}
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {t.name}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-6xl tracking-tight">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.sub}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="mt-8 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-revenue" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/onboarding"
                className={`mt-10 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${
                  t.featured
                    ? "bg-revenue text-revenue-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:bg-surface-elevated"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
