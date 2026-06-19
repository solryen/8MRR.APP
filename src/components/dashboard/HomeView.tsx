import type { NavItem } from "@/routes/dashboard";

interface Props {
  onNavigate: (v: NavItem) => void;
}

export function HomeView({ onNavigate }: Props) {
  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <CurrentReadCard onNavigate={onNavigate} />
        <RevenuePathCard onNavigate={onNavigate} />
      </div>

      <FirstBatchCard onNavigate={onNavigate} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <InspirationPreviewCard onNavigate={onNavigate} />
        <MemoryPreviewCard onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function CurrentReadCard({ onNavigate }: Props) {
  const rows = [
    { label: "Product detected",      value: "Content revenue platform for creators" },
    { label: "Goal",                   value: "Sales" },
    { label: "Audience",               value: "Indie founders, creator-operators" },
    { label: "Best starting angle",    value: "Pain-led / founder story" },
    { label: "Recommended format",     value: "Instagram + TikTok carousels" },
  ];

  return (
    <div className="lg:col-span-3 rounded-2xl border border-border bg-surface/60 paper-card p-6">
      <CardHeader
        dot="green"
        label="8's Current Read"
        sub="First strategy built from your onboarding"
      />
      <div className="mt-4 space-y-2.5">
        {rows.map(r => (
          <div key={r.label} className="flex items-start justify-between gap-4 rounded-xl bg-background/60 border border-border px-4 py-2.5">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider shrink-0">{r.label}</span>
            <span className="text-xs text-foreground text-right font-medium">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <PrimaryBtn onClick={() => onNavigate("create")}>Generate First Batch</PrimaryBtn>
        <SecondaryBtn>View Strategy</SecondaryBtn>
        <SecondaryBtn onClick={() => onNavigate("settings")}>Edit Brand Rules</SecondaryBtn>
      </div>
    </div>
  );
}

function RevenuePathCard({ onNavigate }: Props) {
  const steps = [
    { label: "Post",         icon: "◆" },
    { label: "Profile Visit",icon: "◆" },
    { label: "Link Click",   icon: "◆" },
    { label: "Signup",       icon: "◆" },
    { label: "Revenue",      icon: "◆" },
  ];

  return (
    <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/60 paper-card p-6 flex flex-col">
      <CardHeader
        dot="amber"
        label="Revenue Path"
        sub="Content to cash pipeline"
      />

      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center">
              <div className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 border ${
                s.label === "Revenue"
                  ? "border-revenue/30 bg-revenue/8"
                  : "border-border bg-background/40"
              }`}>
                <span className={`text-[10px] font-mono ${s.label === "Revenue" ? "text-revenue" : "text-muted-foreground"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-xs font-medium ${s.label === "Revenue" ? "text-revenue" : "text-foreground"}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-px h-1.5 bg-border" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200/60 px-4 py-3">
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Revenue tracking not connected yet. 8 will use Commercial Intent Score until revenue data is available.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <PrimaryBtn onClick={() => onNavigate("tracking")}>Set Up Tracking Link</PrimaryBtn>
          <SecondaryBtn onClick={() => onNavigate("tracking")}>Connect Stripe</SecondaryBtn>
        </div>
      </div>
    </div>
  );
}

function FirstBatchCard({ onNavigate }: Props) {
  const types = [
    { label: "Pain-led",             count: 3, color: "bg-revenue" },
    { label: "Outcome-led",          count: 2, color: "bg-orange-300" },
    { label: "Mistake-correction",   count: 2, color: "bg-amber-300" },
    { label: "Comparison",           count: 1, color: "bg-yellow-300" },
    { label: "Founder story",        count: 1, color: "bg-surface-elevated" },
    { label: "Trend-pattern remix",  count: 1, color: "bg-surface-elevated" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface/60 paper-card p-6">
      <div className="flex items-start justify-between gap-4">
        <CardHeader
          dot="revenue"
          label="First Batch Recommendation"
          sub="10 carousel experiments across 6 angles"
        />
        <div className="shrink-0 flex items-center gap-1.5 rounded-full border border-revenue/30 bg-revenue/8 px-3 py-1 font-mono text-xs text-revenue font-semibold">
          10 carousels
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {types.map(t => (
          <div key={t.label} className="rounded-xl border border-border bg-background/60 p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`h-2 w-2 rounded-full ${t.color}`} />
              <span className="font-mono text-lg font-semibold text-foreground">{t.count}</span>
            </div>
            <span className="text-[10px] text-muted-foreground leading-tight block">{t.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        <PrimaryBtn onClick={() => onNavigate("create")}>Generate Batch</PrimaryBtn>
        <SecondaryBtn>Customize Batch</SecondaryBtn>
      </div>
    </div>
  );
}

function InspirationPreviewCard({ onNavigate }: Props) {
  const cards = [
    {
      platform: "TikTok",
      views: "284K",
      pattern: "Mistake Correction",
      reason: "High comment density with direct buyer questions.",
      comments: "1.2K",
    },
    {
      platform: "Instagram",
      views: "91K",
      pattern: "Pain Confession",
      reason: "Strong save rate signals audience recognition of problem.",
      comments: "640",
    },
    {
      platform: "Instagram",
      views: "173K",
      pattern: "Outcome-led",
      reason: "Profile visit spike after final slide with direct CTA.",
      comments: "890",
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface/60 paper-card p-6">
      <CardHeader dot="blue" label="Inspiration Preview" sub="Source patterns 8 selected for your first batch" />

      <div className="mt-4 space-y-3">
        {cards.map((c, i) => (
          <div key={i} className="rounded-xl border border-border bg-background/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{c.platform}</span>
              <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                <span>{c.views} views</span>
                <span>{c.comments} comments</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center rounded-full bg-revenue/10 border border-revenue/20 px-2 py-0.5 text-[10px] font-mono text-revenue font-medium">
                {c.pattern}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{c.reason}</p>
            <div className="mt-3 flex gap-2">
              <button className="text-[11px] font-medium text-revenue hover:underline">Use Pattern</button>
              <button className="text-[11px] font-medium text-muted-foreground hover:text-foreground">Ignore</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <SecondaryBtn onClick={() => onNavigate("inspiration")}>View All Inspiration</SecondaryBtn>
      </div>
    </div>
  );
}

function MemoryPreviewCard({ onNavigate }: Props) {
  const sections = [
    { label: "Product Truth",   value: "Revenue-native content tool for operators who treat every post as a test." },
    { label: "Audience Pain",   value: "Posting consistently without seeing any traceable sales impact." },
    { label: "Brand Rules",     value: "3 rules imported from onboarding" },
    { label: "Claim Boundaries",value: "No revenue guarantees. No follower-count promises." },
    { label: "Competitors",     value: "Fastlane, LarryLoop, Motion, Foreplay identified" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface/60 paper-card p-6">
      <CardHeader dot="purple" label="Project Memory Preview" sub="What 8 already knows about your project" />

      <div className="mt-4 space-y-2.5">
        {sections.map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-background/60 px-4 py-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">{s.label}</div>
            <div className="text-xs text-foreground leading-relaxed">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <PrimaryBtn onClick={() => onNavigate("memory")}>Open Memory</PrimaryBtn>
        <SecondaryBtn>Edit Rules</SecondaryBtn>
      </div>
    </div>
  );
}

function CardHeader({
  dot,
  label,
  sub,
}: {
  dot: "green" | "amber" | "revenue" | "blue" | "purple" | "dim";
  label: string;
  sub?: string;
}) {
  const dotClass: Record<string, string> = {
    green:   "bg-emerald-500",
    amber:   "bg-amber-400",
    revenue: "bg-revenue",
    blue:    "bg-sky-400",
    purple:  "bg-violet-400",
    dim:     "bg-border",
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dotClass[dot]}`} />
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      {sub && <p className="mt-0.5 ml-4 text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function PrimaryBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-xl bg-revenue px-4 py-2 text-xs font-medium text-revenue-foreground transition hover:opacity-90"
    >
      {children}
    </button>
  );
}

function SecondaryBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-elevated"
    >
      {children}
    </button>
  );
}
