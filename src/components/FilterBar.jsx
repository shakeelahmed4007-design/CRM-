import { Search, SlidersHorizontal, X } from 'lucide-react';
import { STATUSES, PRIORITIES } from '../utils';

export default function FilterBar({ filters, setFilters, clear, searchInputRef }) {
  const isFiltered = filters.search || filters.status || filters.priority || filters.sort !== 'newest';

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-200/60 p-4 dark:border-white/10">
      <div className="group relative flex min-w-[180px] flex-1 items-center">
        <Search size={15} className="pointer-events-none absolute left-3 text-slate-400 transition-colors group-focus-within:text-blue-600 dark:text-slate-400 dark:group-focus-within:text-blue-400" />
        <input
          ref={searchInputRef}
          aria-label="Search leads"
          placeholder="Filter by name, email, company..."
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          className="field pl-9 text-xs"
        />
      </div>

      <SlidersHorizontal size={15} className="hidden text-slate-400 xl:block" />

      <select
        aria-label="Filter by status"
        className="field w-auto flex-1 sm:flex-none text-xs"
        value={filters.status}
        onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by priority"
        className="field w-auto flex-1 sm:flex-none text-xs"
        value={filters.priority}
        onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value }))}
      >
        <option value="">All priorities</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        aria-label="Sort leads"
        className="field w-auto text-xs"
        value={filters.sort}
        onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="value-desc">Value: high to low</option>
        <option value="value-asc">Value: low to high</option>
      </select>

      {isFiltered && (
        <button
          onClick={clear}
          className="glass-subtle flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-white/80 dark:text-blue-400 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={13} />
          Reset filters
        </button>
      )}
    </div>
  );
}

