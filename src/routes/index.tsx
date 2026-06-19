import { createFileRoute } from "@tanstack/react-router";
import { FloatingLogo } from "@/components/Logo";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { InfinityEight } from "@/components/InfinityEight";
import { LoopExplainer } from "@/components/LoopExplainer";
import { EngineFeatures } from "@/components/EngineFeatures";
import { Proof } from "@/components/Proof";
import { Pricing } from "@/components/Pricing";
import { CTA, Footer } from "@/components/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "8 — The revenue loop for your content" },
      {
        name: "description",
        content:
          "8 turns your content into a Stripe native revenue loop. Create, publish, measure revenue, learn, repeat, every post compounds into the next sale.",
      },
      { property: "og:title", content: "8 — The revenue loop for your content" },
      {
        property: "og:description",
        content:
          "Stop posting for likes. 8 doubles down on the content that actually drives Stripe revenue.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <FloatingLogo />
      <div className="relative z-[2]">
        <Hero />
        <Marquee />
        <InfinityEight />
        <LoopExplainer />
        <EngineFeatures />
        <div className="contents lg:block">
          <Proof />
          <Pricing />
        </div>
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
