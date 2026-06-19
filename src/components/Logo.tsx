import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 96"
      fill="none"
      strokeWidth="6"
      className={className}
      aria-hidden
    >
      <circle cx="32" cy="24" r="18" stroke="oklch(0.72 0.19 47)" />
      <circle cx="32" cy="68" r="22" stroke="oklch(0.72 0.19 47)" />
    </svg>
  );
}

/**
 * Floating "8" logo.
 * Rotates on scroll (Y-axis flip) and on tap/click.
 * No auto-spin — fully user-driven.
 */
export function FloatingLogo() {
  const raw = useMotionValue(0);
  const rotateY = useSpring(raw, { stiffness: 180, damping: 22 });

  useEffect(() => {
    let last = window.scrollY;
    function onScroll() {
      const delta = window.scrollY - last;
      last = window.scrollY;
      raw.set(raw.get() + delta * 1.2);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [raw]);

  function handleTap() {
    raw.set(raw.get() + 360);
  }

  return (
    <div className="fixed left-1/2 top-5 z-[1] -translate-x-1/2">
      <motion.button
        onClick={handleTap}
        style={{ rotateY, transformPerspective: 400 }}
        className="cursor-pointer"
        aria-label="Spin the 8"
      >
        <LogoMark className="h-10 w-10 drop-shadow-sm" />
      </motion.button>
    </div>
  );
}
