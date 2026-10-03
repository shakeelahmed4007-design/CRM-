import { Users, Plus, SearchX } from 'lucide-react';

export default function EmptyState({ filtered = false, onAdd, onClear, compact = false }) {
  const Icon = filtered ? SearchX : Users;

  return (
    <div className={`flex flex-col items-center text-center ${compact ? 'p-6' : 'p-10 sm:p-14'}`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
        <Icon size={22} />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        {filtered ? 'No matching leads found' : 'No pipeline leads yet'}
      </h3>
      <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">
        {filtered
          ? 'Try adjusting your search criteria or reset active filters.'
          : 'Add your first lead to start tracking opportunities.'}
      </p>
      <button
        onClick={filtered ? onClear : onAdd}
        className="btn-primary mt-4 text-xs"
      >
        {!filtered && <Plus size={15} />}
        {filtered ? 'Reset filters' : 'Add your first lead'}
      </button>
    </div>
  );
}

