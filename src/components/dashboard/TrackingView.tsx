export function TrackingView() {
  const connections = [
    { name: "Stripe",       status: "disconnected" },
    { name: "Shopify",      status: "disconnected" },
    { name: "RevenueCat",   status: "disconnected" },
    { name: "Adapty",       status: "disconnected" },
    { name: "TikTok",       status: "disconnected" },
    { name: "Instagram",    status: "disconnected" },
  ];

  const modes = [
    { label: "Manual Results",           active: true  },
    { label: "Bio Link Attribution",     active: false },
    { label: "Direct Tracking Link",     active: false },
    { label: "Revenue Connected",        active: false },
  ];

  const confidence = [
    { level: "High",   label: "Direct tracking link + conversion confirmed",    color: "bg-emerald-500" },
    { level: "Medium", label: "Bio link click spike after post detected",       color: "bg-amber-400"   },
    { level: "Low",    label: "Manual metrics only — no attribution layer",     color: "bg-border"      },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="rounded-2xl border border-border bg-surface/60 paper-card p-6">
        <SectionHeader label="Tracking Link" />
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
          <span className="font-mono text-sm text-foreground">8.link/my-project</span>
          <div className="ml-auto flex gap-2">
            <SmBtn>Copy Link</SmBtn>
            <SmBtn>Open Link Page</SmBtn>
            <SmBtn>Edit Destination</SmBtn>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface/60 paper-card p-6">
        <SectionHeader label="Attribution Mode" />
        <div className="mt-4 space-y-2">
          {modes.map(m => (
            <label key={m.label} className="flex items-center gap-3 cursor-pointer rounded-xl border border-border bg-background px-4 py-3 hover:bg-surface-elevated transition">
              <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${m.active ? "border-revenue" : "border-border"}`}>
                {m.active && <div className="h-2 w-2 rounded-full bg-revenue" />}
              </div>
              <span className={`text-xs font-medium ${m.active ? "text-foreground" : "text-muted-foreground"}`}>{m.label}</span>
              {m.active && <span className="ml-auto text-[10px] font-mono text-revenue uppercase tracking-wider">Current</span>}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface/60 paper-card p-6">
        <SectionHeader label="Connections" />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {connections.map(c => (
            <div key={c.name} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-border" />
                <span className="text-xs font-medium text-foreground">{c.name}</span>
              </div>
              <button className="text-[11px] font-medium text-revenue hover:underline">Connect</button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface/60 paper-card p-6">
        <SectionHeader label="Confidence Levels" />
        <div className="mt-4 space-y-2.5">
          {confidence.map(c => (
            <div key={c.level} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${c.color}`} />
              <span className="text-xs font-semibold text-foreground w-16 shrink-0">{c.level}</span>
              <span className="text-xs text-muted-foreground">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return <div className="text-sm font-semibold text-foreground">{label}</div>;
}

function SmBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center rounded-lg border border-border bg-surface px-3 py-1 text-[11px] font-medium text-foreground transition hover:bg-surface-elevated">
      {children}
    </button>
  );
}
