import { Pencil, Trash2 } from 'lucide-react';
import { currency, dateLabel, initials } from '../utils.js';
import { STATUSES } from '../constants.js';
import { StatusBadge, PriorityBadge, SourceBadge } from './Badges.jsx';

export function LeadIdentity({ lead }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[11px] font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
        {initials(lead.name)}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900 dark:text-white" title={lead.name}>
          {lead.name}
        </p>
        <p className="truncate text-xs text-slate-500 dark:text-slate-400" title={lead.email}>
          {lead.email}
        </p>
      </div>
    </div>
  );
}

function Actions({ lead, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={() => onEdit(lead)}
        aria-label={`Edit ${lead.name}`}
        title="Edit lead"
        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/80 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <Pencil size={14} />
      </button>
      <button
        onClick={() => onDelete(lead)}
        aria-label={`Delete ${lead.name}`}
        title="Delete lead"
        className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function StatusSelect({ lead, onStatus }) {
  return (
    <div className="relative inline-flex rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 dark:focus-within:ring-offset-slate-900">
      <StatusBadge status={lead.status} />
      <select
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label={`Change status for ${lead.name}`}
        value={lead.status}
        onChange={(e) => onStatus(lead.id, e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function LeadRow({ lead, onEdit, onDelete, onStatus }) {
  return (
    <tr className="border-b border-slate-200/40 transition-colors duration-150 last:border-0 hover:bg-white/60 dark:border-white/5 dark:hover:bg-white/[0.04]">
      <td className="max-w-[220px] px-4 py-3 first:pl-5">
        <LeadIdentity lead={lead} />
      </td>
      <td className="max-w-[150px] truncate px-4 py-3 text-xs text-slate-700 dark:text-slate-300" title={lead.company}>
        {lead.company || '—'}
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <SourceBadge source={lead.source} />
      </td>
      <td className="px-4 py-3">
        <StatusSelect lead={lead} onStatus={onStatus} />
      </td>
      <td className="px-4 py-3">
        <PriorityBadge priority={lead.priority} />
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold tabular-nums text-slate-900 dark:text-white">
        {currency(lead.dealValue)}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
        {dateLabel(lead.createdAt)}
      </td>
      <td className="px-4 py-3 text-right pr-5">
        <Actions lead={lead} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}

export function LeadCard({ lead, onEdit, onDelete, onStatus }) {
  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <LeadIdentity lead={lead} />
        <Actions lead={lead} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="truncate text-slate-600 dark:text-slate-400">
          {lead.company || 'No company'}
        </span>
        <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
          {currency(lead.dealValue)}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <StatusSelect lead={lead} onStatus={onStatus} />
          <PriorityBadge priority={lead.priority} />
          <SourceBadge source={lead.source} />
        </div>
        <span>{dateLabel(lead.createdAt)}</span>
      </div>
    </div>
  );
}


