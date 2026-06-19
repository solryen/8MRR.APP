import instagramShot from "@/assets/proof-instagram.jpg";
import tiktokShot from "@/assets/proof-tiktok.jpg";
import creatorShot from "@/assets/proof-creator.jpg";

const quotes = [
  {
    q: "I stopped guessing what to post on Monday. 8 just tells me what made money last week and gives me ten new versions of it.",
    a: "Maya R.",
    r: "Solo founder, digital products",
    m: "$8.2k → $31k MRR",
    img: instagramShot,
    handle: "@mayabuilds",
    platform: "Instagram",
    href: "https://instagram.com",
    metric: "1.2M views, 38% conversion lift",
    likes: "84.2k",
  },
  {
    q: "It's the first 'AI content tool' that didn't make me sound like AI. The angles are mine, just sharper, and tied to real revenue.",
    a: "Jonas K.",
    r: "Course creator",
    m: "+274% paid signups",
    img: tiktokShot,
    handle: "@jonas.builds",
    platform: "TikTok",
    href: "https://tiktok.com",
    metric: "412k followers, 9.3M views / mo",
    likes: "61.7k",
  },
  {
    q: "Closing the loop with Stripe was the unlock. I can finally see which 90 seconds of video paid for the month.",
    a: "Priya N.",
    r: "Agency owner",
    m: "$112k attributed in Q1",
    img: creatorShot,
    handle: "@priya.studio",
    platform: "YouTube",
    href: "https://youtube.com",
    metric: "$112k Stripe attributed in Q1",
    likes: "49.3k",
  },
];

export function Proof() {
  return (
    <section id="proof" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-revenue">
            In the loop
          </div>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] tracking-[-0.025em] md:text-6xl">
            Operators who stopped posting for likes.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm text-muted-foreground md:text-base">
            Real accounts. Real Stripe revenue. Each one runs the same loop.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.a}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 paper-card"
            >
              <a
                href={q.href}
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-[4/5] overflow-hidden"
              >
                <img
                  src={q.img}
                  alt={`${q.platform} performance for ${q.handle}`}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-80">
                      {q.platform}
                    </div>
                    <div className="mt-1 text-sm font-medium">{q.handle}</div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <span aria-hidden>♥</span>
                      {q.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <span aria-hidden>↗</span>
                      View
                    </span>
                  </div>
                </div>
              </a>

              <div className="flex flex-1 flex-col justify-between gap-6 p-7">
                <blockquote className="font-display text-xl font-light leading-snug tracking-tight md:text-2xl">
                  "{q.q}"
                </blockquote>
                <figcaption className="space-y-3">
                  <div className="h-px w-full bg-border" />
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">{q.a}</div>
                      <div className="text-xs text-muted-foreground">{q.r}</div>
                    </div>
                    <div className="font-mono text-xs text-revenue">{q.m}</div>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {q.metric}
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
