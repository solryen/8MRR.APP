import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl leading-none">
          <span className="text-revenue">8</span>
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-muted-foreground">
            /eight
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="/#loop" className="transition hover:text-foreground">The Loop</a>
          <a href="/#engine" className="transition hover:text-foreground">Engine</a>
          <a href="/#proof" className="transition hover:text-foreground">Proof</a>
          <a href="/#pricing" className="transition hover:text-foreground">Pricing</a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/signin"
            className="hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm text-foreground transition hover:bg-surface"
          >
            Sign in
          </Link>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-revenue px-4 py-2 text-sm font-medium text-revenue-foreground transition hover:opacity-90"
          >
            Start the loop
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
