import type { NavItem } from "@/routes/dashboard";

const NAV: { id: NavItem; label: string; icon: React.ReactNode }[] = [
  { id: "home",         label: "Home",         icon: <HomeIcon /> },
  { id: "create",       label: "Create",       icon: <CreateIcon /> },
  { id: "inspiration",  label: "Inspiration",  icon: <InspirationIcon /> },
  { id: "experiments",  label: "Experiments",  icon: <ExperimentsIcon /> },
  { id: "results",      label: "Results",      icon: <ResultsIcon /> },
  { id: "memory",       label: "Memory",       icon: <MemoryIcon /> },
  { id: "tracking",     label: "Tracking",     icon: <TrackingIcon /> },
  { id: "assets",       label: "Assets",       icon: <AssetsIcon /> },
  { id: "settings",     label: "Settings",     icon: <SettingsIcon /> },
];

interface Props {
  active: NavItem;
  onNavigate: (v: NavItem) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ active, onNavigate, collapsed, onToggle }: Props) {
  return (
    <aside
      className="flex flex-col shrink-0 border-r border-border bg-surface h-full transition-all duration-200"
      style={{ width: collapsed ? 64 : 220 }}
    >
      <div className={`flex items-center border-b border-border ${collapsed ? "justify-center px-0 py-5" : "px-5 py-5"}`}>
        <button
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="transition-opacity hover:opacity-70"
          aria-label="Toggle sidebar"
        >
          <svg viewBox="0 0 64 96" fill="none" strokeWidth="5" className="h-7 w-auto shrink-0">
            <circle cx="32" cy="24" r="18" stroke="oklch(0.72 0.19 47)" />
            <circle cx="32" cy="68" r="22" stroke="oklch(0.72 0.19 47)" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto overflow-x-hidden">
        {NAV.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 rounded-xl text-sm font-medium transition-colors text-left overflow-hidden ${
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"
              } ${
                isActive
                  ? "bg-revenue/10 text-revenue"
                  : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
              }`}
            >
              <span className={`shrink-0 ${isActive ? "text-revenue" : "text-muted-foreground"}`}>
                {icon}
              </span>
              {!collapsed && (
                <span className="truncate">{label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-border px-4 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">Credits</span>
            <span className="text-xs font-mono font-semibold text-foreground bg-surface-elevated border border-border px-2 py-0.5 rounded-full">
              240
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground/60 leading-relaxed">
            8 — Revenue Loop Engine
          </div>
        </div>
      )}

      {collapsed && (
        <div className="border-t border-border py-4 flex justify-center">
          <span className="text-xs font-mono font-semibold text-foreground bg-surface-elevated border border-border px-2 py-0.5 rounded-full">
            240
          </span>
        </div>
      )}
    </aside>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function CreateIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
      <circle cx="10" cy="10" r="7" />
    </svg>
  );
}

function InspirationIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M5 3h10v11l-5-3-5 3V3z" strokeLinejoin="round" />
      <path d="M13 7l1.5-1.5M14.5 9H16M13 11l1.5 1.5" strokeLinecap="round" />
    </svg>
  );
}

function ExperimentsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="3" y="5" width="14" height="3" rx="1" />
      <rect x="3" y="9" width="14" height="3" rx="1" />
      <rect x="3" y="13" width="14" height="3" rx="1" />
    </svg>
  );
}

function ResultsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M3 15V9M7 15V6M11 15V10M15 15V4" strokeLinecap="round" />
      <circle cx="16.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MemoryIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <ellipse cx="10" cy="10" rx="7" ry="5" />
      <path d="M3 10c0 2.8 3.1 5 7 5s7-2.2 7-5" />
      <path d="M10 5v10M7 6.5v7M13 6.5v7" strokeLinecap="round" />
    </svg>
  );
}

function TrackingIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M3 10a4 4 0 004 4h6a4 4 0 000-8H7a4 4 0 000 8" strokeLinecap="round" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AssetsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="4" y="7" width="12" height="10" rx="1.5" />
      <rect x="6" y="4" width="12" height="10" rx="1.5" />
      <rect x="8" y="2" width="10" height="8" rx="1.5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 3v1.5M10 15.5V17M3 10h1.5M15.5 10H17M5.05 5.05l1.06 1.06M13.89 13.89l1.06 1.06M5.05 14.95l1.06-1.06M13.89 6.11l1.06-1.06" strokeLinecap="round" />
    </svg>
  );
}
