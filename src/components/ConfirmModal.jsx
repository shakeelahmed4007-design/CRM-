import { Trash2, X } from 'lucide-react';
import { useDialog } from '../hooks/useDialog';

export default function ConfirmModal({ lead, onClose, onConfirm }) {
  const ref = useDialog(onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        className="glass-strong animate-scale-in w-full max-w-md rounded-xl p-6 shadow-2xl border border-white/50 dark:border-white/15"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
            <Trash2 size={20} />
          </span>
          <button
            onClick={onClose}
            aria-label="Close confirmation"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/80 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <h2 id="delete-title" className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
          Delete this lead record?
        </h2>
        <p id="delete-description" className="mt-2 break-words text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-900 dark:text-white">{lead.name}</span> and all associated pipeline data will be permanently removed. This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-2.5">
          <button onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger text-xs">
            Delete lead
          </button>
        </div>
      </div>
    </div>
  );
}

