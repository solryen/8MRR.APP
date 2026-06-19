import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#ig-grad)" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="url(#ig-grad)" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#EE1D52"
        d="M20.1 7.7a4.83 4.83 0 0 1-3.77-4.25V3h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.69a8.2 8.2 0 0 0 4.79 1.52V7.76a4.85 4.85 0 0 1-1.02-.06Z"
      />
      <path
        fill="#69C9D0"
        opacity="0.75"
        d="M19.09 6.7a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.06Z"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#FF0000"
        d="M21.6 7.2a2.5 2.5 0 0 0-1.7-1.7C18.3 5 12 5 12 5s-6.3 0-7.9.5A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.7C5.7 19 12 19 12 19s6.3 0 7.9-.5a2.5 2.5 0 0 0 1.7-1.7A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8Z"
      />
      <path fill="white" d="M10 15V9l5 3-5 3Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#1877F2" className="h-5 w-5">
      <path d="M24 12a12 12 0 1 0-13.875 11.854v-8.385H7.078V12h3.047V9.356c0-3.007 1.791-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385A12.007 12.007 0 0 0 24 12Z" />
    </svg>
  );
}

const networks = [
  { name: "Instagram", Icon: IgIcon },
  { name: "TikTok",    Icon: TikTokIcon },
  { name: "YouTube",   Icon: YouTubeIcon },
  { name: "Facebook",  Icon: FacebookIcon },
];

export function SocialStripe() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % networks.length), 1800);
    return () => clearInterval(id);
  }, []);

  const { name, Icon } = networks[i];

  return (
    <div className="mx-auto flex w-full max-w-sm items-start justify-between gap-6 px-2">

      {/* Column 1 — cycling social icon + label */}
      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/70 backdrop-blur paper-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              aria-label={name}
            >
              <Icon />
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground text-center leading-tight whitespace-nowrap">
          Every channel
        </span>
      </div>

      {/* Column 2 — infinity loop + label */}
      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/70 backdrop-blur paper-card">
          <span
            aria-hidden
            className="font-display text-2xl leading-none text-revenue"
            style={{ letterSpacing: "-0.06em" }}
          >
            ∞
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground text-center leading-tight whitespace-nowrap">
          One loop
        </span>
      </div>

      {/* Column 3 — Stripe + label */}
      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/70 backdrop-blur paper-card">
          <img
            src="/stripe-wordmark.png"
            alt="Stripe"
            className="h-4 w-auto"
            style={{ filter: "saturate(1.1)" }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground text-center leading-tight whitespace-nowrap">
          Tracked to revenue
        </span>
      </div>

    </div>
  );
}
