import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function InfinityEight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0.08, 0.38], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.5, 1], [0.85, 1, 1.05, 0.95]);

  const eightOpacity = useTransform(scrollYProgress, [0.28, 0.48], [1, 0]);

  const glow = useTransform(scrollYProgress, [0.08, 0.5], [0.2, 1]);
  const negRotate = useTransform(rotate, (r) => -r);

  const circleTextOpacity = useTransform(scrollYProgress, [0.22, 0.36], [0, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] overflow-hidden border-y border-border bg-background md:min-h-[130vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <GlowBackground value={glow} />

        {/* All content in normal flow — no absolute positioning, zero overlap risk */}
        <div className="relative flex w-full max-w-4xl flex-col items-center gap-5">

          {/* Eyebrow */}
          <motion.span
            style={{ opacity: labelOpacity }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-revenue"
          >
            ↳ The Revenue Loop
          </motion.span>

          {/* Rotating 8 glyph */}
          <motion.div
            style={{ rotate, scale }}
            className="relative flex items-center justify-center"
          >
            <span
              aria-hidden
              className="relative block font-display leading-none text-foreground"
              style={{
                fontSize: "clamp(8rem, 36vw, 28rem)",
                letterSpacing: "-0.05em",
              }}
            >
              <motion.span style={{ opacity: eightOpacity }} className="block">
                8
              </motion.span>

              {/* "one" — bottom circle of 8 */}
              <motion.span
                style={{
                  rotate: negRotate,
                  opacity: circleTextOpacity,
                  position: "absolute",
                  top: "68%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  fontSize: "clamp(0.7rem, 2vw, 2.4rem)",
                }}
                className="font-mono uppercase tracking-[0.2em] text-revenue whitespace-nowrap"
              >
                one
              </motion.span>

              {/* "loop" — top circle of 8 */}
              <motion.span
                style={{
                  rotate: negRotate,
                  opacity: circleTextOpacity,
                  position: "absolute",
                  top: "32%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  fontSize: "clamp(0.7rem, 2vw, 2.4rem)",
                }}
                className="font-mono uppercase tracking-[0.2em] text-revenue whitespace-nowrap"
              >
                loop
              </motion.span>
            </span>
          </motion.div>

          {/* Subtitle block — always in flow, never absolute */}
          <motion.div
            style={{ opacity: subtitleOpacity }}
            className="flex flex-col items-center gap-3 w-full"
          >
            <p className="font-display text-2xl font-light tracking-tight text-foreground text-center md:text-4xl">
              Five moves.{" "}
              <span className="italic text-muted-foreground">Infinite compounding.</span>
            </p>
            <p className="w-full text-center text-sm text-muted-foreground md:text-base">
              Most tools stop at "post more." 8 closes the circle,{" "}
              <br className="hidden md:block" />
              every output is judged by revenue, then fed back as input.
            </p>
            <a
              href="/onboarding"
              className="mt-1 inline-flex items-center gap-2 rounded-full bg-revenue px-7 py-3 text-sm font-medium text-revenue-foreground shadow-md transition hover:scale-[1.02] hover:shadow-lg"
            >
              Start Free
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function GlowBackground({ value }: { value: MotionValue<number> }) {
  const opacity = useTransform(value, (v) => v);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 radial-revenue"
    />
  );
}
