import { LayoutDashboard, Users, UserPlus, BarChart3, X, Settings } from 'lucide-react';
import { useDialog } from '../hooks/useDialog';

export function LeadflowLogo({ size = 20 }) {
  return (
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 shadow-md shadow-blue-500/25 ring-1 ring-white/30">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="white"
          fillOpacity="0.25"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads', icon: Users, hasCount: true },
  { id: 'add', label: 'Add Lead', icon: UserPlus },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

function Content({ view, navigate, count, close, onOpenSettings }) {
  return (
    <div className="flex h-full flex-col justify-between select-none">
      {/* Top Header & Navigation */}
      <div>
        {/* Brand Header */}
        <div className="flex h-[72px] items-center justify-between px-5 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <LeadflowLogo size={19} />
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
                LEADFLOW
              </span>
              <span className="glass-subtle rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase">
                CRM
              </span>
            </div>
          </div>
          {close && (
            <button
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close navigation"
              onClick={close}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <div className="px-3.5 pt-6">
          <p className="px-3.5 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 font-mono">
            Menu
          </p>

          <nav aria-label="Main navigation" className="space-y-2.5">
            {navItems.map(({ id, label, icon: Icon, hasCount }) => {
              const isActive = view === id;
              return (
                <button
                  key={id}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => navigate(id)}
                  className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-500/30 scale-[1.01]'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={19}
                      className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'}
                    />
                    <span>{label}</span>
                  </div>

                  {hasCount && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white backdrop-blur-sm'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-400'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom User Profile */}
      <div className="p-3.5 border-t border-slate-200/80 dark:border-white/10">
        <div className="flex items-center justify-between rounded-xl p-2 bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/10 transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-800/80">
          <div
            onClick={onOpenSettings}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
            title="Open Workspace Settings"
          >
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-xs">
                SA
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                Shakeel Ahmed
              </p>
              <p className="truncate text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Admin
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSettings}
            className="rounded p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-slate-700 transition-colors"
            title="Workspace Settings"
            aria-label="Workspace Settings"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Drawer(props) {
  const ref = useDialog(props.close);
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={props.close} />
      <aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="fixed inset-y-0 left-0 flex h-full w-64 flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-2xl text-slate-900 shadow-2xl dark:border-white/10 dark:bg-slate-900/90 dark:text-white"
      >
        <Content {...props} />
      </aside>
    </div>
  );
}

export default function Sidebar({ open, ...props }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/80 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/75 lg:flex shadow-xs">
        <Content {...props} close={undefined} />
      </aside>
      {open && <Drawer {...props} />}
    </>
  );
}




