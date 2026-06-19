export function SettingsView() {
  const brandRules = [
    { label: "Allowed tone",      value: "Direct, honest, outcome-focused" },
    { label: "Forbidden tone",    value: "Hype-led, vague, promise-heavy" },
    { label: "Words to avoid",    value: "Crush it, scale, viral, passive income" },
    { label: "Claims to avoid",   value: "Revenue guarantees, follower promises" },
    { label: "Visual style",      value: "Clean, minimal, data-forward" },
    { label: "CTA style",         value: "Direct action: link in bio, swipe, follow" },
    { label: "Forbidden formats", value: "Pure trend-audio remixes without message" },
  ];

  const platforms = ["Instagram", "TikTok", "Facebook", "YouTube"];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Section label="Project Setup">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Project Name",    value: "My Project" },
            { label: "Industry",        value: "Creator tools / SaaS" },
            { label: "Primary Goal",    value: "Sales" },
            { label: "Content Mode",    value: "Manual" },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                {f.label}
              </label>
              <input
                defaultValue={f.value}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground outline-none transition focus:border-revenue focus:ring-2 focus:ring-revenue/20"
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <SaveBtn />
        </div>
      </Section>

      <Section label="Brand Rules">
        <div className="space-y-2.5">
          {brandRules.map(r => (
            <div key={r.label} className="rounded-xl border border-border bg-background px-4 py-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                {r.label}
              </div>
              <input
                defaultValue={r.value}
                className="w-full bg-transparent text-xs text-foreground outline-none"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <SaveBtn />
          <Btn>Add Rule</Btn>
          <Btn>Reset to Onboarding</Btn>
        </div>
      </Section>

      <Section label="Platforms">
        <div className="space-y-2">
          {platforms.map(p => (
            <div key={p} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-border" />
                <span className="text-xs font-medium text-foreground">{p}</span>
              </div>
              <button className="text-[11px] font-medium text-revenue hover:underline">Connect</button>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Billing / Credits">
        <div className="rounded-xl border border-border bg-background px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">240 credits remaining</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Each carousel batch uses ~10 credits</div>
            </div>
            <button className="inline-flex items-center rounded-xl bg-revenue px-4 py-2 text-xs font-medium text-revenue-foreground transition hover:opacity-90">
              Buy Credits
            </button>
          </div>
        </div>
      </Section>

      <Section label="Team">
        <div className="rounded-xl border border-border bg-background px-4 py-4 text-center">
          <p className="text-xs text-muted-foreground">Team collaboration is available on the Growth plan.</p>
          <button className="mt-3 inline-flex items-center rounded-xl bg-revenue px-4 py-2 text-xs font-medium text-revenue-foreground transition hover:opacity-90">
            Upgrade
          </button>
        </div>
      </Section>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 paper-card p-6">
      <div className="text-sm font-semibold text-foreground mb-4">{label}</div>
      {children}
    </div>
  );
}

function SaveBtn() {
  return (
    <button className="inline-flex items-center rounded-xl bg-revenue px-4 py-2 text-xs font-medium text-revenue-foreground transition hover:opacity-90">
      Save Changes
    </button>
  );
}

function Btn({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-elevated">
      {children}
    </button>
  );
}
