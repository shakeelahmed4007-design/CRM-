import { X, LogOut } from 'lucide-react';
import { useDialog } from '../hooks/useDialog';

export default function SettingsModal({
  isOpen,
  onClose,
  leads = [],
  onLogout,
}) {
  const ref = useDialog(onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="glass-strong animate-scale-in w-full max-w-md rounded-2xl p-6 shadow-xl border border-white/70 dark:border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/70 pb-3.5 dark:border-white/10">
          <h2 id="settings-title" className="text-base font-bold text-slate-900 dark:text-white">
            Settings
          </h2>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        <div className="space-y-4 pt-4">
          {/* User Profile */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-sm text-white shadow-xs">
                SA
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Shakeel Ahmed</span>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/20 px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">shakeel@leadflow.io</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                {leads.length} Leads
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                Active Session
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-slate-200/70 pt-3.5 dark:border-white/10 flex items-center justify-between">
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="btn-primary text-xs ml-auto"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
