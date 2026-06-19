import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/routes/dashboard";
import type { useProjects, Project } from "@/hooks/useProjects";

const VIEW_LABELS: Record<NavItem, string> = {
  home:         "Home",
  create:       "Create",
  inspiration:  "Inspiration",
  experiments:  "Experiments",
  results:      "Results",
  memory:       "Memory",
  tracking:     "Tracking",
  assets:       "Assets",
  settings:     "Settings",
};

const GOALS = ["Sales", "Leads", "Installs", "Audience"] as const;
const PLATFORMS = ["Instagram", "TikTok", "Facebook", "YouTube"] as const;

interface Props {
  active: NavItem;
  projectsCtx: ReturnType<typeof useProjects>;
}

export function TopBar({ active, projectsCtx }: Props) {
  const { projects, activeProject, switchProject, addProject, deleteProject } = projectsCtx;
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    goal: "Sales" as Project["goal"],
    platforms: ["Instagram", "TikTok"] as string[],
  });

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
        setCreating(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  function togglePlatform(p: string) {
    setForm(f => ({
      ...f,
      platforms: f.platforms.includes(p)
        ? f.platforms.filter(x => x !== p)
        : [...f.platforms, p],
    }));
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    addProject({
      name: form.name.trim(),
      goal: form.goal,
      platforms: form.platforms.length ? form.platforms : ["Instagram"],
    });
    setForm({ name: "", goal: "Sales", platforms: ["Instagram", "TikTok"] });
    setCreating(false);
    setOpen(false);
  }

  return (
    <header className="shrink-0 flex items-center justify-between gap-4 px-6 lg:px-8 py-3.5 border-b border-border bg-surface/80 backdrop-blur">
      <div className="flex items-center gap-3">

        <div className="relative" ref={dropRef}>
          <button
            onClick={() => { setOpen(o => !o); setCreating(false); }}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface-elevated"
          >
            <span className="h-2 w-2 rounded-full bg-revenue shrink-0" />
            <span className="max-w-[140px] truncate">{activeProject.name}</span>
            <ChevronIcon />
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-border bg-surface paper-card overflow-hidden shadow-lg">
              {!creating ? (
                <>
                  <div className="px-3 py-2 border-b border-border">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Projects</span>
                  </div>
                  <div className="max-h-52 overflow-y-auto py-1">
                    {projects.map(p => (
                      <div
                        key={p.id}
                        className={`group flex items-center justify-between gap-2 px-3 py-2.5 cursor-pointer transition hover:bg-surface-elevated ${
                          p.id === activeProject.id ? "bg-revenue/5" : ""
                        }`}
                        onClick={() => { switchProject(p.id); setOpen(false); }}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${p.id === activeProject.id ? "bg-revenue" : "bg-border"}`} />
                          <span className="text-xs font-medium text-foreground truncate">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono text-muted-foreground">{p.goal}</span>
                          {projects.length > 1 && (
                            <button
                              onClick={e => { e.stopPropagation(); deleteProject(p.id); }}
                              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition text-[11px] leading-none"
                              title="Delete project"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border p-2">
                    <button
                      onClick={() => setCreating(true)}
                      className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-revenue hover:bg-revenue/8 transition"
                    >
                      <span className="text-base leading-none">+</span>
                      New Project
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleCreate} className="p-4 space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-foreground">New Project</span>
                    <button type="button" onClick={() => setCreating(false)} className="text-muted-foreground hover:text-foreground text-lg leading-none">
                      ←
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                      Project Name
                    </label>
                    <input
                      autoFocus
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. My Shopify Store"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition focus:border-revenue focus:ring-2 focus:ring-revenue/20 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                      Goal
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {GOALS.map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, goal: g }))}
                          className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition ${
                            form.goal === g
                              ? "border-revenue bg-revenue/10 text-revenue"
                              : "border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                      Platforms
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PLATFORMS.map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => togglePlatform(p)}
                          className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition ${
                            form.platforms.includes(p)
                              ? "border-revenue bg-revenue/10 text-revenue"
                              : "border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!form.name.trim()}
                    className="w-full rounded-lg bg-revenue px-4 py-2 text-xs font-medium text-revenue-foreground transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Create Project
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          <Badge color="orange">{activeProject.goal}</Badge>
          {activeProject.platforms.slice(0, 2).map(p => <Badge key={p}>{p}</Badge>)}
          <Badge color="dim">Manual</Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-foreground font-semibold">240</span>
          <span>credits</span>
        </div>
        <div className="h-4 w-px bg-border hidden md:block" />
        <div className="text-sm font-medium text-muted-foreground">
          {VIEW_LABELS[active]}
        </div>
      </div>
    </header>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 text-muted-foreground shrink-0">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ children, color }: { children: React.ReactNode; color?: "orange" | "dim" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-medium ${
      color === "orange"
        ? "border-revenue/30 bg-revenue/10 text-revenue"
        : color === "dim"
        ? "border-border bg-surface-elevated text-muted-foreground"
        : "border-border bg-surface-elevated text-foreground"
    }`}>
      {children}
    </span>
  );
}
