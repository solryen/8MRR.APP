import { Link } from "@tanstack/react-router";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-border py-40">
      <div className="pointer-events-none absolute inset-0 radial-revenue opacity-80" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-5xl font-light leading-[1.05] tracking-[-0.025em] md:text-7xl">
          Stop posting.
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <span className="font-display text-[clamp(4rem,12vw,11rem)] leading-none tracking-[-0.05em] text-foreground">∞</span>
          <span className="font-display text-5xl font-light italic text-revenue md:text-7xl">Start compounding.</span>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
          Plug in Stripe, connect a channel, and 8 starts learning what
          your audience actually buys within the first week.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-revenue px-7 py-3.5 text-sm font-medium text-revenue-foreground glow-revenue transition hover:scale-[1.02]"
          >
            Start the loop →
          </Link>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-3.5 text-sm text-foreground backdrop-blur transition hover:bg-surface paper-card"
          >
            Book a 15 min walkthrough
          </a>
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          No card · 14 day loop on us
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 96" fill="none" strokeWidth="6" className="h-8 w-8" aria-hidden>
            <circle cx="32" cy="24" r="18" stroke="oklch(0.72 0.19 47)" />
            <circle cx="32" cy="68" r="22" stroke="oklch(0.72 0.19 47)" />
          </svg>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            the revenue loop
          </span>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Manifesto</a>
          <a href="#" className="hover:text-foreground">Changelog</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
        </div>
        <div className="font-mono text-xs text-muted-foreground">© 8, Inc.</div>
      </div>
    </footer>
  );
}
