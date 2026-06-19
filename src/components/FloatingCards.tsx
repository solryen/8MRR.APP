import { motion } from "framer-motion";

const CARDS = [
  {
    platform: "IG",
    gradient: "from-orange-200 via-rose-100 to-pink-100",
    revenue: "$4,820",
    label: "Founder POV · Reel",
    lines: [0.7, 0.45, 0.6],
  },
  {
    platform: "TT",
    gradient: "from-violet-200 via-purple-100 to-fuchsia-100",
    revenue: "$3,140",
    label: "Case study",
    lines: [0.55, 0.8, 0.4],
  },
  {
    platform: "YT",
    gradient: "from-sky-200 via-blue-100 to-indigo-100",
    revenue: "$2,705",
    label: "60s Short",
    lines: [0.65, 0.5, 0.75],
  },
  {
    platform: "IG",
    gradient: "from-emerald-200 via-teal-100 to-cyan-100",
    revenue: "$6,210",
    label: "Objection arc",
    lines: [0.8, 0.55, 0.45],
  },
  {
    platform: "FB",
    gradient: "from-amber-200 via-orange-100 to-yellow-100",
    revenue: "$1,980",
    label: "Hook thread",
    lines: [0.5, 0.7, 0.6],
  },
];

const POSITIONS: Array<{
  top?: string; bottom?: string; right?: string; left?: string;
  rotate: number; amp: number; dur: number; phase: number;
}> = [
  { top: "6%",  right: "1%",   rotate:  7, amp: 10, dur: 4.4, phase: 0.0  },
  { top: "20%", right: "9%",   rotate: -5, amp:  8, dur: 5.1, phase: 1.2  },
  { top: "2%",  right: "13%",  rotate: -9, amp: 12, dur: 3.8, phase: 2.1  },
  { top: "38%", right: "3%",   rotate:  4, amp:  9, dur: 5.6, phase: 0.8  },
  { top: "9%",  left: "0.5%",  rotate: -6, amp: 11, dur: 4.8, phase: 1.7  },
];

function VideoCard({
  card,
  pos,
  index,
}: {
  card: (typeof CARDS)[number];
  pos: (typeof POSITIONS)[number];
  index: number;
}) {
  return (
    /* Static wrapper: position + opacity. No Framer Motion on this layer
       so the card is visible immediately on first paint. */
    <div
      className="absolute hidden md:block w-[84px] pointer-events-none"
      style={{
        top:    pos.top,
        bottom: pos.bottom,
        right:  pos.right,
        left:   pos.left,
        transform: `rotate(${pos.rotate}deg)`,
        opacity: 0.78,
        zIndex: 0,
      }}
    >
      {/* Float layer — only motion here, no opacity shenanigans */}
      <motion.div
        animate={{ y: [-pos.amp / 2, pos.amp / 2] }}
        transition={{
          duration: pos.dur,
          delay: pos.phase,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${card.gradient} border border-white/70 shadow-xl`}
          style={{ aspectRatio: "9/16" }}
        >
          {/* platform pill */}
          <div className="absolute top-2 left-2 rounded-full bg-black/20 px-1.5 py-0.5 backdrop-blur-sm">
            <span className="font-mono text-[8px] font-bold text-white/90 uppercase tracking-wide">
              {card.platform}
            </span>
          </div>

          {/* content lines */}
          <div className="absolute bottom-10 left-2 right-2 space-y-1.5">
            {card.lines.map((w, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full bg-white/40"
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>

          {/* revenue chip */}
          <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/25 px-1.5 py-1 backdrop-blur-sm">
            <div className="font-mono text-[6.5px] leading-tight text-white/55 truncate">
              {card.label}
            </div>
            <div
              className="font-mono text-[9px] font-bold leading-tight"
              style={{ color: "oklch(0.72 0.19 47)" }}
            >
              {card.revenue}
            </div>
          </div>

          {/* top glint */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(140deg, rgba(255,255,255,0.35) 0%, transparent 45%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function FloatingCards() {
  return (
    <>
      {CARDS.map((card, i) => (
        <VideoCard key={i} card={card} pos={POSITIONS[i]} index={i} />
      ))}
    </>
  );
}
