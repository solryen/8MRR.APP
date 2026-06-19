import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  {
    n: "01",
    title: "Create",
    body: "Generate posts, hooks and angles tuned to your brand voice and your buyer's exact objections.",
    Visual: CreateVisual,
  },
  {
    n: "02",
    title: "Publish",
    body: "Schedule across every channel from one surface. Each post ships with a tracked revenue signal.",
    Visual: PublishVisual,
  },
  {
    n: "03",
    title: "Measure revenue",
    body: "Stripe native attribution maps every sale back to the post, format and angle that earned it.",
    Visual: MeasureVisual,
  },
  {
    n: "04",
    title: "Learn",
    body: "8 spots the patterns no human would, which hooks compound, which formats convert, which days print.",
    Visual: LearnVisual,
  },
  {
    n: "05",
    title: "Repeat, better",
    body: "The next batch is generated from what already moved money. The loop tightens. Revenue compounds.",
    Visual: RepeatVisual,
  },
];

function StepRow({
  s,
}: {
  s: (typeof steps)[number];
  i: number;
}) {
  const { Visual } = s;

  return (
    <motion.li
      initial={{ opacity: 0.28 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group grid grid-cols-[64px_1fr] gap-6 border-t border-border py-10 md:grid-cols-[88px_1fr_320px] md:gap-10 md:py-12"
    >
      <motion.span
        className="font-mono text-sm pt-1 transition-colors duration-500"
        initial={{ color: "oklch(0.6 0.01 60)" }}
        whileInView={{ color: "oklch(0.72 0.19 47)" }}
        viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
        transition={{ duration: 0.5 }}
      >
        {s.n}
      </motion.span>
      <div className="min-w-0">
        <h3 className="font-display text-3xl tracking-tight md:text-4xl">{s.title}</h3>
        <p className="mt-2 max-w-lg text-muted-foreground">{s.body}</p>
      </div>
      <div className="col-span-2 md:col-span-1">
        <motion.div
          initial={{ opacity: 0.4, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-border/60 bg-surface/50 p-3 backdrop-blur shadow-sm paper-card overflow-hidden"
        >
          <Visual />
        </motion.div>
      </div>
    </motion.li>
  );
}

export function LoopExplainer() {
  return (
    <section id="loop" className="relative pt-6 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <ol className="relative">
          {steps.map((s, i) => (
            <StepRow key={s.n} s={s} i={i} />
          ))}
          <li className="border-t border-border" />
        </ol>

        {/* CTA after the loop */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Ready to close the loop?
          </p>
          <a
            href="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-revenue px-8 py-3.5 text-sm font-medium text-revenue-foreground shadow-md transition hover:scale-[1.02] hover:shadow-lg"
            style={{ boxShadow: "0 0 0 0 oklch(0.72 0.19 47 / 0)" }}
          >
            Start Free
            <span aria-hidden>→</span>
          </a>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            No card · 14 day loop on us
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Step 1: Create — 3×2 grid of 9:16 video thumbnails ─── */
function CreateVisual() {
  const palette = [
    "from-orange-200 to-orange-100",
    "from-sky-200 to-sky-100",
    "from-violet-200 to-violet-100",
    "from-rose-200 to-rose-100",
    "from-emerald-200 to-emerald-100",
    "from-amber-200 to-amber-100",
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {palette.map((g, i) => (
        <div
          key={i}
          className={`aspect-[9/16] rounded-lg bg-gradient-to-b ${g} border border-white/40 relative overflow-hidden`}
        >
          <div className="absolute bottom-1 left-1 h-1.5 w-1.5 rounded-full bg-white/60" />
          {i < 2 && (
            <div className="absolute top-1 right-1 rounded-sm bg-revenue/80 px-0.5 font-mono text-[5px] text-white leading-tight">
              NEW
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Step 2: Publish — animated button + cursor ─── */
function PublishVisual() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative flex flex-col items-center gap-3 py-3">
      <div className="flex items-center gap-2 w-full px-1">
        {["IG", "TT", "YT", "FB"].map((ch) => (
          <div
            key={ch}
            className="flex-1 rounded-lg border border-border bg-background/60 py-1.5 text-center font-mono text-[9px] text-muted-foreground"
          >
            {ch}
          </div>
        ))}
      </div>
      <motion.div
        className="relative"
        {...(mounted ? {
          animate: { scale: [1, 0.96, 1] },
          transition: { duration: 0.4, delay: 1, repeat: Infinity, repeatDelay: 2.6 },
        } : {})}
      >
        <div className="flex items-center gap-2 rounded-full bg-revenue px-5 py-2.5 shadow-md">
          <span className="text-xs font-medium text-white">Publish now</span>
          <span className="text-white text-xs">→</span>
        </div>
        {mounted && (
          <motion.div
            className="absolute -bottom-1 right-4 pointer-events-none"
            animate={{
              x: [20, 0, 0, 20],
              y: [20, 4, 4, 20],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 0.9, delay: 0.8, repeat: Infinity, repeatDelay: 2.1 }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 drop-shadow-lg" fill="none">
              <path
                d="M5 3L19 12L12 13.5L9 20L5 3Z"
                fill="oklch(0.18 0.01 60)"
                stroke="white"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>
        )}
      </motion.div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        4 channels · scheduled
      </div>
    </div>
  );
}

/* ─── Step 3: Measure revenue ─── */
const revenueRows = [
  { label: "Instagram Reel", amount: 2847, bar: 84 },
  { label: "TikTok video", amount: 1920, bar: 57 },
  { label: "YouTube Short", amount: 3412, bar: 100 },
  { label: "Instagram video", amount: 1105, bar: 33 },
];

function MeasureVisual() {
  return (
    <div className="space-y-2.5 py-1">
      {revenueRows.map((r) => (
        <div key={r.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-foreground/80 truncate pr-2">{r.label}</span>
            <span className="font-mono text-[11px] text-revenue shrink-0">
              ${r.amount.toLocaleString()}
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-revenue"
              initial={{ width: 0 }}
              whileInView={{ width: `${r.bar}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
      <div className="pt-1 border-t border-border flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Total May
        </span>
        <span className="font-mono text-xs font-medium text-foreground">$9,284</span>
      </div>
    </div>
  );
}

/* ─── Step 4: Learn ─── */
const insights = [
  { dir: "up", mult: "3.2×", label: "founder POV, Tuesdays", color: "text-emerald-600" },
  { dir: "up", mult: "2.1×", label: "objection-first carousels", color: "text-emerald-600" },
  { dir: "up", mult: "1.8×", label: "case study Reels, 60 s", color: "text-emerald-600" },
  { dir: "dn", mult: "0.3×", label: "generic listicles", color: "text-rose-500" },
];

function LearnVisual() {
  return (
    <div className="space-y-2 py-1">
      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
        8 found this week
      </div>
      {insights.map((ins, i) => (
        <motion.div
          key={ins.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="flex items-center gap-2"
        >
          <span className={`font-mono text-[11px] w-8 shrink-0 ${ins.color}`}>
            {ins.dir === "up" ? "↑" : "↓"} {ins.mult}
          </span>
          <span className="text-[11px] text-foreground/80 truncate">{ins.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Step 5: Repeat ─── */
const weeks = [
  { label: "Wk 1", val: 2400 },
  { label: "Wk 4", val: 8700 },
  { label: "Wk 12", val: 24300 },
  { label: "Wk 24", val: 64200 },
];

function RepeatVisual() {
  const max = Math.max(...weeks.map((w) => w.val));
  return (
    <div className="py-1">
      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
        Same loop, compounding
      </div>
      <div className="flex items-end gap-2 h-20">
        {weeks.map((w, i) => (
          <div key={w.label} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t-md bg-revenue/80"
              initial={{ height: 0 }}
              whileInView={{ height: `${(w.val / max) * 72}px` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
            />
            <div className="font-mono text-[8px] text-muted-foreground whitespace-nowrap">
              {w.label}
            </div>
            <div className="font-mono text-[8px] text-revenue whitespace-nowrap">
              ${(w.val / 1000).toFixed(1)}k
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
