export function EngineFeatures() {
  return (
    <section id="engine" className="relative border-t border-border bg-surface/40 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-revenue">
            Inside the engine
          </div>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] tracking-[-0.025em] md:text-6xl">
            Built around the only metric that matters.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm text-muted-foreground md:text-base">
            Likes are vanity. Reach is rented. Revenue is the only signal
            8 listens to, and the only one it optimises against.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3 md:grid-rows-2">
          <Cell
            big
            tag="Idea engine"
            title="Angles that already converted, remixed."
            body="8 keeps a private library of your highest revenue hooks and re-spins them into fresh posts you'd never think to write."
            visual={<HookGrid />}
          />
          <Cell
            tag="Stripe attribution"
            title="Every sale, traced to a post."
            body="Native Stripe sync ties each checkout to the exact piece of content that earned it."
          />
          <Cell
            tag="One inbox"
            title="Publish everywhere from one surface."
            body="LinkedIn, Reels, Shorts, TikTok, newsletter, one queue, one calendar."
          />
          <Cell
            tag="Format intelligence"
            title="Knows which format prints money this week."
            body="Carousels on Tuesday. Reels on Thursday. 8 finds the pattern before you do."
          />
          <Cell
            big
            tag="Learning loop"
            title="Gets sharper every week, automatically."
            body="No dashboards to read. 8 ships you a Monday brief: what to make more of, what to cut, what to test next."
            visual={<BriefVisual />}
          />
        </div>
      </div>
    </section>
  );
}

function Cell({
  tag,
  title,
  body,
  big,
  visual,
}: {
  tag: string;
  title: string;
  body: string;
  big?: boolean;
  visual?: React.ReactNode;
}) {
  return (
    <div
      className={`group relative flex flex-col justify-between gap-8 bg-background p-8 transition hover:bg-surface md:p-10 ${
        big ? "md:col-span-2 md:row-span-1" : ""
      }`}
    >
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-revenue">
          {tag}
        </div>
        <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight md:text-4xl">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-muted-foreground">{body}</p>
      </div>
      {visual}
    </div>
  );
}

function HookGrid() {
  const hooks = [
    "The 1 thing nobody tells you about pricing.",
    "I deleted 80% of my offer. Revenue went up.",
    "Stop writing threads. Start writing receipts.",
    "Your funnel isn't broken, your hook is.",
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {hooks.map((h, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-surface/60 p-3 text-sm leading-snug text-foreground/90 paper-card"
        >
          <div className="font-mono text-[10px] text-revenue">+${(i + 1) * 612}</div>
          <div className="mt-1">{h}</div>
        </div>
      ))}
    </div>
  );
}

function BriefVisual() {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5 font-mono text-xs leading-relaxed text-muted-foreground paper-card">
      <div className="text-foreground">// Monday brief, week 14</div>
      <div className="mt-2">
        <span className="text-revenue">+</span> double founder POV reels (×3)
      </div>
      <div>
        <span className="text-revenue">+</span> ship "objection" carousels Tue/Thu
      </div>
      <div>
        <span className="text-destructive">−</span> drop generic listicles
      </div>
      <div>
        <span className="text-revenue">→</span> test paid teardown angle
      </div>
    </div>
  );
}
