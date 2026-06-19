import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — 8" },
      { name: "description", content: "Sign in to your 8 revenue loop." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 radial-revenue opacity-50" />
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />

      <header className="relative mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl leading-none">
          <span className="text-revenue">8</span>
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-muted-foreground">
            /eight
          </span>
        </Link>
      </header>

      <section className="relative mx-auto flex max-w-md flex-col px-6 pb-24 pt-20">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-revenue">
          Welcome back
        </div>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
          Sign in to your loop.
        </h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 grid gap-4 rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur"
        >
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-revenue focus:ring-2 focus:ring-revenue/30"
              placeholder="alex@company.com"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-revenue focus:ring-2 focus:ring-revenue/30"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-revenue px-7 py-3 text-sm font-medium text-revenue-foreground glow-revenue transition hover:scale-[1.02]"
          >
            Sign in →
          </button>
          <p className="text-xs text-muted-foreground">
            New to 8?{" "}
            <Link to="/onboarding" className="text-revenue hover:underline">
              Set up your loop
            </Link>
            .
          </p>
        </form>
      </section>
    </main>
  );
}
