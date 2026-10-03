import { useMemo } from 'react';
import {
  Plus,
  Users,
  Database,
  Trophy,
  BarChart2,
  AlertTriangle,
  FlaskConical,
} from 'lucide-react';
import { metrics, currency, filterLeads } from '../utils';
import MetricCard from './MetricCard';
import Charts from './Charts';
import EmptyState from './EmptyState';
import { LeadIdentity } from './LeadRow';
import { StatusBadge } from './Badges';

export function MetricGrid({ leads }) {
  const data = useMemo(() => metrics(leads), [leads]);
  const cards = [
    {
      label: 'Total Leads',
      value: data.total,
      icon: Users,
      detail: 'Active Pool',
    },
    {
      label: 'Pipeline Value',
      value: currency(data.pipeline),
      icon: Database,
      detail: 'Open Deals',
    },
    {
      label: 'Won Revenue',
      value: currency(data.revenue),
      icon: Trophy,
      detail: 'Closed-Won',
    },
    {
      label: 'Conversion Rate',
      value: `${data.conversion.toFixed(1)}%`,
      icon: BarChart2,
      detail: 'Win Rate',
    },
    {
      label: 'High Priority',
      value: data.high,
      icon: AlertTriangle,
      detail: data.high > 0 ? 'Urgent' : 'Clear',
      hasDot: true,
      dotColor: data.high > 0 ? 'bg-amber-500' : 'bg-emerald-500',
    },
  ];

  return (
    <div className="glass-strong rounded-2xl border border-slate-200/70 dark:border-white/10 shadow-xs overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-white/10">
      {cards.map((c) => (
        <MetricCard key={c.label} {...c} />
      ))}
    </div>
  );
}

export default function Dashboard({ leads, dark, navigate, onEdit, onSamples }) {
  const recent = useMemo(() => filterLeads(leads, {}).slice(0, 5), [leads]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            CRM Workspace Overview
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Pipeline Activity & Insights
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          {!leads.length && (
            <button className="btn-secondary text-xs" onClick={onSamples}>
              <FlaskConical size={14} />
              Load sample data
            </button>
          )}
          <button className="btn-primary text-xs" onClick={() => navigate('add')}>
            <Plus size={15} />
            Add lead
          </button>
        </div>
      </div>

      <MetricGrid leads={leads} />

      {/* Main Grid: Recent Leads + Pipeline Overview */}
      <div className="grid items-stretch gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="flex min-w-0 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Leads
              </h2>
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {recent.length}
              </span>
            </div>
            <button
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group"
              onClick={() => navigate('leads')}
            >
              <span>View all leads</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-150">→</span>
            </button>
          </div>

          {!recent.length ? (
            <div className="glass rounded-2xl flex flex-1 items-center justify-center p-6">
              <EmptyState compact onAdd={() => navigate('add')} />
            </div>
          ) : (
            <div className="space-y-2">
              {recent.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => onEdit(lead)}
                  className="group flex w-full items-center justify-between gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-xs transition-all duration-150 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <LeadIdentity lead={lead} />
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block">
                      <StatusBadge status={lead.status} />
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white min-w-[60px] text-right">
                      {currency(lead.value ?? lead.dealValue ?? 0)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <Charts leads={leads} dark={dark} onlyStatus />
      </div>
    </div>
  );
}

