import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { SocialStripe } from "./SocialStripe";

/* ─── Config ─── */

const PHRASES = [
  { text: "Turn",         orange: false },
  { text: "your content", orange: false },
  { text: "into a",       orange: false },
  { text: "revenue loop", orange: true  },
] as const;

const DWELL = 1700; // ms per phrase
const PX    = 12;   // horizontal padding
const PY    = 2;    // vertical padding — kept tiny to avoid bleeding into adjacent lines

type Box = { x: number; y: number; w: number; h: number };

/* ─── Glassy focus rectangle ─── */

function FocusRect({ box }: { box: Box }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute rounded-[16px]"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 100%)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.75)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.9), " +
          "inset 0 -1px 0 rgba(0,0,0,0.04), " +
          "0 4px 24px rgba(0,0,0,0.08), " +
          "0 1px 4px rgba(0,0,0,0.06)",
      }}
      initial={false}
      animate={{
        left:   box.x - PX,
        top:    box.y - PY,
        width:  box.w + PX * 2,
        height: box.h + PY * 2,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 24, mass: 0.85 }}
    />
  );
}

/* ─── Hero ─── */

export function Hero() {
  const [active,  setActive]  = useState(0);
  const [mounted, setMounted] = useState(false);
  const [box,     setBox]     = useState<Box | null>(null);
  const [showAnimatedUI, setShowAnimatedUI] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const spanRefs   = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const id = window.setTimeout(() => setShowAnimatedUI(true), 50);
    return () => window.clearTimeout(id);
  }, []);

  // Precise measurement via ResizeObserver + getBoundingClientRect on inline-block spans
  useEffect(() => {
    if (!mounted) return;

    const measure = () => {
      const h = headingRef.current;
      const s = spanRefs.current[active];
      if (!h || !s) return;
      const hR = h.getBoundingClientRect();
      const sR = s.getBoundingClientRect();
      setBox({ x: sR.left - hR.left, y: sR.top - hR.top, w: sR.width, h: sR.height });
    };

    measure();
    // Re-measure whenever the heading changes size (font loads, viewport resize, etc.)
    const ro = new ResizeObserver(measure);
    const h = headingRef.current;
    if (h) ro.observe(h);
    return () => ro.disconnect();
  }, [active, mounted]);

  // Cycle phrases
  useEffect(() => {
    const id = setInterval(() => setActive(v => (v + 1) % PHRASES.length), DWELL);
    return () => clearInterval(id);
  }, []);


  return (
    <section className="relative overflow-hidden pt-20 pb-20">
      <div className="pointer-events-none absolute inset-0 radial-revenue opacity-60" />
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />

      <div className="relative mx-auto max-w-5xl px-6 pt-28 text-center">

        {/* badge */}
        <div className="overflow-hidden mx-auto mb-10 inline-flex">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 28, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur paper-card"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-revenue ticker-up" />
            VC Backed
          </motion.div>
        </div>

        {/* title with focus window */}
        <h1
          ref={headingRef}
          className="relative mx-auto max-w-4xl font-sans text-[clamp(2.45rem,5.2vw,4.7rem)] font-extrabold leading-[1.12] tracking-[-0.07em] text-foreground"
        >
          {/* glassy rect — client-only, after first measure */}
          {mounted && showAnimatedUI && box && <FocusRect box={box} />}

          {PHRASES.map((seg, i) => (
            <Fragment key={seg.text}>
              {i > 0 && " "}
              <span
                ref={el => { spanRefs.current[i] = el; }}
                style={{
                  display: "inline-block",
                  transition: "filter 0.42s ease, opacity 0.42s ease",
                  filter:  i === active ? "none" : "blur(0.8px)",
                  opacity: i === active ? 1 : 0.38,
                  color:   seg.orange ? "var(--revenue)" : undefined,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {seg.text}
              </span>
            </Fragment>
          ))}

          <span
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: 1,
              color: "var(--revenue)",
              transition: "filter 0.42s ease, opacity 0.42s ease",
              filter:  active === 3 ? "none" : "blur(0.8px)",
              opacity: active === 3 ? 1 : 0.38,
            }}
          >.</span>
        </h1>

        {/* subtitle */}
        <p className="mx-auto mt-7 max-w-lg text-balance text-base font-medium leading-[1.6] text-muted-foreground md:text-[1.05rem]">
          8 tracks what makes people buy, then doubles down, turning
          every post into momentum for the next sale.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-revenue px-6 py-3 text-sm font-medium text-revenue-foreground glow-revenue transition hover:scale-[1.02]"
          >
            Start your loop
            <span aria-hidden>→</span>
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 text-sm text-foreground backdrop-blur transition hover:bg-surface paper-card"
          >
            Open Dashboard
          </Link>
        </div>

        {/* social stripe */}
        <div className="mt-12">
          <SocialStripe />
        </div>

        {/* revenue card */}
        <div className="mt-14">
          <RevenueCard />
        </div>

      </div>
    </section>
  );
}

/* ─── Revenue card ─── */

function RevenueCard() {
  const rows = [
    { label: "Reel · founder POV",       rev: "$4,820", lift: "+38%" },
    { label: "Carousel · case study",    rev: "$3,140", lift: "+22%" },
    { label: "Short · objection handle", rev: "$2,705", lift: "+19%" },
    { label: "Hook · one line truth",    rev: "$1,980", lift: "+12%" },
  ];
  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-surface/70 p-2 text-left shadow-[var(--shadow-elevated)] backdrop-blur paper-card">
      <div className="rounded-[1.4rem] border border-border bg-background/60 p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-revenue" />
            Live · Stripe attribution
          </div>
          <div className="font-mono text-xs text-muted-foreground">last 30d</div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Revenue from content
            </div>
            <div className="mt-2 font-display text-5xl tracking-tight text-foreground md:text-6xl">
              $42,318
              <span className="ml-3 text-base font-sans text-revenue">+27.4%</span>
            </div>
            <Sparkline />
          </div>
          <div className="space-y-2">
            {rows.map(r => (
              <div
                key={r.label}
                className="flex items-center justify-between rounded-xl border border-border bg-surface/50 px-3 py-2 text-sm"
              >
                <span className="truncate text-muted-foreground">{r.label}</span>
                <span className="flex items-center gap-2 font-mono">
                  <span className="text-foreground">{r.rev}</span>
                  <span className="text-revenue">{r.lift}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  const points = [12, 18, 14, 22, 28, 24, 32, 30, 38, 44, 42, 56, 62, 70];
  const max  = Math.max(...points);
  const path = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${100 - (p / max) * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="mt-6 h-24 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="oklch(0.72 0.19 47)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.72 0.19 47)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`${path} 100,100 0,100`} fill="url(#sg)" stroke="none" />
      <polyline
        points={path}
        fill="none"
        stroke="oklch(0.72 0.19 47)"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
