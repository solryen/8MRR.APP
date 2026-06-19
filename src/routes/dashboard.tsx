import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { HomeView } from "@/components/dashboard/HomeView";
import { CreateView } from "@/components/dashboard/CreateView";
import { InspirationView } from "@/components/dashboard/InspirationView";
import { ExperimentsView } from "@/components/dashboard/ExperimentsView";
import { ResultsView } from "@/components/dashboard/ResultsView";
import { MemoryView } from "@/components/dashboard/MemoryView";
import { TrackingView } from "@/components/dashboard/TrackingView";
import { AssetsView } from "@/components/dashboard/AssetsView";
import { SettingsView } from "@/components/dashboard/SettingsView";
import { useProjects } from "@/hooks/useProjects";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — 8" }],
  }),
  component: Dashboard,
});

export type NavItem =
  | "home"
  | "create"
  | "inspiration"
  | "experiments"
  | "results"
  | "memory"
  | "tracking"
  | "assets"
  | "settings";

function Dashboard() {
  const [active, setActive] = useState<NavItem>("home");
  const [collapsed, setCollapsed] = useState(false);
  const projectsCtx = useProjects();

  const view: Record<NavItem, React.ReactNode> = {
    home: <HomeView onNavigate={setActive} />,
    create: <CreateView />,
    inspiration: <InspirationView />,
    experiments: <ExperimentsView />,
    results: <ResultsView />,
    memory: <MemoryView />,
    tracking: <TrackingView />,
    assets: <AssetsView />,
    settings: <SettingsView />,
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar active={active} onNavigate={setActive} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar active={active} projectsCtx={projectsCtx} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {view[active]}
        </main>
      </div>

      <button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-xs font-medium text-foreground shadow-lg transition hover:bg-surface-elevated paper-card"
        title="Ask Infy"
      >
        <InfinityIcon />
        Ask Infy
      </button>
    </div>
  );
}

function InfinityIcon() {
  return (
    <svg viewBox="0 0 40 20" fill="none" strokeWidth="2.5" strokeLinecap="round" className="h-4 w-auto" stroke="oklch(0.72 0.19 47)">
      <path d="M20 10 C20 10 17 4 12 4 C7 4 4 7 4 10 C4 13 7 16 12 16 C17 16 20 10 20 10 C20 10 23 4 28 4 C33 4 36 7 36 10 C36 13 33 16 28 16 C23 16 20 10 20 10 Z" />
    </svg>
  );
}
