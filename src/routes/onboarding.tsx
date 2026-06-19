import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step =
  | { key: "website"; title: string; type: "website" }
  | { key: "analyzing"; title: string; type: "analyzing" }
  | { key: "summary"; title: string; type: "summary" }
  | {
      key: "goal";
      title: string;
      type: "choices";
      hint?: string;
      options: string[];
      multi?: boolean;
    }
  | {
      key: "rules";
      title: string;
      type: "choices";
      hint?: string;
      options: string[];
      multi?: boolean;
    }
  | {
      key: "platforms";
      title: string;
      type: "choices";
      hint?: string;
      options: string[];
      multi?: boolean;
      maxSelected?: number;
    }
  | {
      key: "engine";
      title: string;
      type: "choices";
      hint?: string;
      options: string[];
      multi?: boolean;
    }
  | { key: "signup"; title: string; type: "signup" };

const steps: Step[] = [
  {
    key: "website",
    title: "Paste your website",
    type: "website",
  },
  {
    key: "analyzing",
    title: "Reading your project",
    type: "analyzing",
  },
  {
    key: "summary",
    title: "Review what 8 found",
    type: "summary",
  },
  {
    key: "goal",
    title: "What should 8 optimize for first?",
    type: "choices",
    hint: "Choose the first outcome you want 8 to score for.",
    options: ["Sales", "App installs", "Leads", "Audience growth"],
  },
  {
    key: "rules",
    title: "What should 8 avoid?",
    type: "choices",
    hint: "Pick the rules that keep the output on brand.",
    options: [
      "No memes",
      "No fake urgency",
      "No luxury-breaking slang",
      "No aggressive sales tone",
      "No AI-looking visuals",
      "No trends",
    ],
    multi: true,
  },
  {
    key: "platforms",
    title: "Where should 8 focus first?",
    type: "choices",
    hint: "Choose up to 2.",
    options: ["TikTok", "Instagram", "Facebook", "YouTube"],
    multi: true,
    maxSelected: 2,
  },
  {
    key: "engine",
    title: "What should 8 generate first?",
    type: "choices",
    hint: "This decides the first experiment batch.",
    options: ["Carousel stories", "Short videos", "Both"],
  },
  {
    key: "signup",
    title: "Create your account",
    type: "signup",
  },
];

function deriveUsername(email: string): string {
  const local = (email.split("@")[0] ?? "").replace(/[^a-zA-Z]/g, "");
  if (!local) return "";
  return local.length > 10 ? local.slice(0, Math.ceil(local.length / 2)) : local;
}

function Onboarding() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [website, setWebsite] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [analysisReady, setAnalysisReady] = useState(false);

  const total = steps.length;
  const current = steps[stepIndex];
  const progress = ((stepIndex + 1) / total) * 100;

  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function next() {
    setStepIndex((i) => Math.min(i + 1, total - 1));
  }

  function pick(value: string) {
    if (!current || current.type !== "choices") return;
    if (current.multi) {
      const prev = (answers[current.key] as string[]) || [];
      const nextValues = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      const limited = current.maxSelected ? nextValues.slice(0, current.maxSelected) : nextValues;
      setAnswers({ ...answers, [current.key]: limited });
    } else {
      setAnswers({ ...answers, [current.key]: value });
      setTimeout(() => setStepIndex((i) => Math.min(i + 1, total - 1)), 180);
    }
  }

  function startAnalysis() {
    if (!website.trim()) return;
    setAnalysisReady(false);
    setStepIndex(1);
    window.setTimeout(() => setAnalysisReady(true), 2200);
    window.setTimeout(() => setStepIndex(2), 2500);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/" });
  }

  const selected = current && current.type === "choices" ? answers[current.key] : undefined;
  const canContinue =
    current?.type === "choices"
      ? current.multi
        ? Array.isArray(selected) && selected.length > 0
        : !!selected
      : current?.type === "website"
        ? !!website.trim()
        : true;

  const summary = {
    product: website ? "Detected product and positioning" : "Paste a website to begin",
    audience: website ? "Audience, tone, and offer mapped" : "Waiting for site",
    category: website ? "Category identified" : "Waiting for site",
    competitors: website ? "Competitor set collected" : "Waiting for site",
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 radial-revenue opacity-50" />
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />

      <header className="relative mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {stepIndex > 0 && (
              <motion.button
                key="back-arrow"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                type="button"
                onClick={back}
                aria-label="Go back"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-surface hover:text-foreground"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <Link to="/" className="flex items-center gap-2 font-display text-2xl leading-none">
            <span className="text-revenue">8</span>
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-muted-foreground">
              /eight
            </span>
          </Link>
        </div>

        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Step {stepIndex + 1} / {total}
        </div>
      </header>

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-surface-elevated">
          <motion.div
            className="h-full bg-revenue"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <section className="relative mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-16">
        <AnimatePresence mode="wait">
          {current?.type === "website" && (
            <motion.div
              key="website"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]"
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-revenue">Project setup</div>
                <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
                  {current.title}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                  8 will analyze your product, audience, competitors, and content opportunities before asking you to configure anything.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    startAnalysis();
                  }}
                  className="mt-10 grid gap-4 rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur"
                >
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Website
                    </span>
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-revenue focus:ring-2 focus:ring-revenue/30"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={!website.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-revenue px-7 py-3 text-sm font-medium text-revenue-foreground glow-revenue transition hover:scale-[1.02] disabled:opacity-40"
                  >
                    Analyze Website →
                  </button>
                </form>
              </div>

              <div className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur paper-card">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  What happens next
                </div>
                <div className="mt-5 grid gap-3 text-sm text-foreground">
                  <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Read positioning</div>
                  <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Understand audience</div>
                  <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Find competitors</div>
                  <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Map content patterns</div>
                  <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Build project memory</div>
                </div>
              </div>
            </motion.div>
          )}

          {current?.type === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid gap-8 md:grid-cols-[1fr_0.9fr]"
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-revenue">Live analysis</div>
                <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
                  {current.title}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                  8 is reading your site and building project memory.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur paper-card">
                <div className="grid gap-3 text-sm text-foreground">
                  {(analysisReady
                    ? [
                        "Reading positioning...",
                        "Understanding audience...",
                        "Analyzing competitors...",
                        "Finding customer pain points...",
                        "Studying content patterns...",
                        "Building project memory...",
                      ]
                    : ["Scanning website..."]
                  ).map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-background/70 px-4 py-3">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {current?.type === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-revenue">
                AI summary
              </div>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
                Review what 8 found
              </h1>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                Confirm what 8 learned before generating the first experiment batch.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur paper-card">
                  <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Project memory</div>
                  <div className="mt-4 grid gap-3 text-sm">
                    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Product summary: {summary.product}</div>
                    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Detected audience: {summary.audience}</div>
                    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Detected category: {summary.category}</div>
                  </div>
                </div>
                <div className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur paper-card">
                  <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Research notes</div>
                  <div className="mt-4 grid gap-3 text-sm">
                    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Competitors found: {summary.competitors}</div>
                    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Common content patterns collected</div>
                    <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">Suggested positioning ready</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-revenue px-7 py-3 text-sm font-medium text-revenue-foreground glow-revenue transition hover:scale-[1.02]"
                >
                  Looks good →
                </button>
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm text-foreground transition hover:bg-surface"
                >
                  Edit manually
                </button>
              </div>
            </motion.div>
          )}

          {current?.type === "choices" && current && (
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-revenue">
                Project setup
              </div>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
                {current.title}
              </h1>
              {current.hint && <p className="mt-4 text-sm text-muted-foreground">{current.hint}</p>}

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {current.options.map((opt) => {
                  const isPicked = current.multi
                    ? Array.isArray(selected) && selected.includes(opt)
                    : selected === opt;
                  const blocked =
                    current.maxSelected &&
                    current.multi &&
                    Array.isArray(selected) &&
                    !selected.includes(opt) &&
                    selected.length >= current.maxSelected;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pick(opt)}
                      disabled={!!blocked}
                      className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-base transition ${
                        isPicked
                          ? "border-revenue bg-revenue/10 text-foreground glow-revenue"
                          : "border-border bg-surface/50 hover:border-revenue/50 hover:bg-surface"
                      } ${blocked ? "opacity-40" : ""}`}
                    >
                      <span>{opt}</span>
                      <span className={`font-mono text-xs ${isPicked ? "text-revenue" : "text-muted-foreground"}`}>
                        {isPicked ? "✓" : "→"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {current.multi && (
                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canContinue}
                    className="inline-flex items-center gap-2 rounded-full bg-revenue px-6 py-2.5 text-sm font-medium text-revenue-foreground transition hover:opacity-90 disabled:opacity-40"
                  >
                    Continue →
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {current?.type === "signup" && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-revenue">
                Ready to generate
              </div>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
                Create your account
              </h1>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground">
                We’ll create your username from your email, then generate your first experiment batch.
              </p>

              <form
                onSubmit={submit}
                className="mt-10 grid gap-4 rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur"
              >
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  type="email"
                  placeholder="you@example.com"
                  required
                />
                {form.email.includes("@") && deriveUsername(form.email) && (
                  <p className="text-xs text-muted-foreground">
                    Your username will be <span className="font-medium text-foreground">@{deriveUsername(form.email).toLowerCase()}</span>
                  </p>
                )}
                <Field
                  label="Password"
                  value={form.password}
                  onChange={(v) => setForm({ ...form, password: v })}
                  type="password"
                  placeholder="At least 8 characters"
                  required
                />

                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-revenue px-7 py-3 text-sm font-medium text-revenue-foreground glow-revenue transition hover:scale-[1.02]"
                  >
                    Start the loop →
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  By creating an account you agree to our terms. Already have one?{" "}
                  <Link to="/signin" className="text-revenue hover:underline">
                    Sign in
                  </Link>
                  .
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-revenue focus:ring-2 focus:ring-revenue/30"
      />
    </label>
  );
}

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your loop — 8" },
      { name: "description", content: "Personalize your revenue loop in 8 quick steps." },
    ],
  }),
  component: Onboarding,
});
