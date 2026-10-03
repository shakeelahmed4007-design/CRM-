import { ArrowDownUp } from 'lucide-react';
import LeadRow, { LeadCard } from './LeadRow';
import EmptyState from './EmptyState';

export default function LeadTable({ leads, total, onEdit, onDelete, onStatus, onAdd, onClear, onSort }) {
  if (!leads.length) return <EmptyState filtered={total > 0} onAdd={onAdd} onClear={onClear} />;

  return (
    <>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead className="sticky top-0 z-10 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">
            <tr>
              {['Lead', 'Company', 'Source', 'Status', 'Priority'].map((t) => (
                <th key={t} scope="col" className="px-4 py-3.5 font-semibold first:pl-5">
                  {t}
                </th>
              ))}
              <th scope="col" className="px-4 py-3.5 font-semibold">
                <button
                  onClick={() => onSort('value')}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-md hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Deal value <ArrowDownUp size={12} />
                </button>
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                <button
                  onClick={() => onSort('date')}
                  className="flex items-center gap-1.5 rounded-md hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Created <ArrowDownUp size={12} />
                </button>
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold text-right pr-5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/40 dark:divide-white/5">
            {leads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatus={onStatus}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-3 lg:hidden">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatus={onStatus}
          />
        ))}
      </div>

      <div className="border-t border-slate-200/60 px-5 py-3.5 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
        Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{leads.length}</span> of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-200">{total}</span> leads
      </div>
    </>
  );
}

