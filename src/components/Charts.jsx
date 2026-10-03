import { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { ChartNoAxesCombined, CircleDot } from 'lucide-react';
import { STATUSES, SOURCES } from '../utils';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const stageConfig = [
  { name: 'New', color: '#3b82f6', bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
  { name: 'Contacted', color: '#06b6d4', bg: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
  { name: 'Qualified', color: '#8b5cf6', bg: 'bg-violet-500', text: 'text-violet-600 dark:text-violet-400' },
  { name: 'Proposal', color: '#f59e0b', bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  { name: 'Won', color: '#10b981', bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  { name: 'Lost', color: '#f43f5e', bg: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
];

function ChartEmpty() {
  return (
    <div className="flex h-44 flex-col items-center justify-center px-4 text-center">
      <ChartNoAxesCombined size={22} strokeWidth={1.5} className="mb-2 text-slate-300 dark:text-slate-600" />
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">No pipeline data yet</p>
      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
        Analytics will generate as leads enter your pipeline.
      </p>
    </div>
  );
}

export default function Charts({ leads, dark, onlyStatus = false }) {
  const counts = useMemo(
    () => STATUSES.map((s) => leads.filter((l) => l.status === s).length),
    [leads]
  );
  const sourceCounts = useMemo(
    () => SOURCES.map((s) => leads.filter((l) => l.source === s).length),
    [leads]
  );

  const totalLeads = leads.length;

  const textColor = dark ? '#94a3b8' : '#64748b';
  const gridColor = dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(148, 163, 184, 0.18)';

  const statusCard = (
    <section className="glass-strong min-w-0 rounded-2xl p-5 border border-slate-200/70 dark:border-white/10 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Pipeline Overview
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Leads distribution by stage
          </p>
        </div>
        <span className="rounded-full bg-blue-50 dark:bg-blue-500/15 px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
          {totalLeads} total
        </span>
      </div>

      {!totalLeads ? (
        <ChartEmpty />
      ) : (
        <div className="mt-2.5 h-[165px] sm:h-[175px]">
          <Bar
            aria-label="Lead count by stage"
            role="img"
            data={{
              labels: STATUSES,
              datasets: [
                {
                  label: 'Leads',
                  data: counts,
                  backgroundColor: [
                    '#3b82f6',
                    '#06b6d4',
                    '#8b5cf6',
                    '#f59e0b',
                    '#10b981',
                    '#f43f5e',
                  ],
                  borderRadius: 6,
                  maxBarThickness: 26,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: dark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                  titleColor: dark ? '#f8fafc' : '#0f172a',
                  bodyColor: dark ? '#cbd5e1' : '#334155',
                  borderColor: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.3)',
                  borderWidth: 1,
                  padding: 8,
                  cornerRadius: 8,
                  callbacks: {
                    label: (ctx) => ` ${ctx.raw} leads (${totalLeads ? ((ctx.raw / totalLeads) * 100).toFixed(0) : 0}%)`,
                  },
                },
              },
              scales: {
                x: {
                  ticks: { color: textColor, font: { size: 10, weight: '500' } },
                  grid: { display: false },
                  border: { display: false },
                },
                y: {
                  beginAtZero: true,
                  ticks: { color: textColor, precision: 0, font: { size: 10 } },
                  grid: { color: gridColor },
                  border: { display: false },
                },
              },
            }}
          />
        </div>
      )}
    </section>
  );

  if (onlyStatus) return statusCard;

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {statusCard}

      <section className="glass min-w-0 rounded-xl p-3.5 sm:p-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
          Acquisition Channels
        </h2>
        <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
          Lead source breakdown
        </p>

        {!leads.length ? (
          <ChartEmpty />
        ) : (
          <div className="mt-2.5 h-[155px]">
            <Bar
              aria-label="Lead count by source"
              role="img"
              data={{
                labels: SOURCES,
                datasets: [
                  {
                    label: 'Leads',
                    data: sourceCounts,
                    backgroundColor: '#2563eb',
                    hoverBackgroundColor: '#1d4ed8',
                    borderRadius: 5,
                    maxBarThickness: 16,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: dark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                    titleColor: dark ? '#f8fafc' : '#0f172a',
                    bodyColor: dark ? '#cbd5e1' : '#334155',
                    borderColor: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.3)',
                    borderWidth: 1,
                    padding: 8,
                    cornerRadius: 8,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: { color: textColor, precision: 0, font: { size: 9 } },
                    grid: { color: gridColor },
                    border: { display: false },
                  },
                  y: {
                    ticks: { color: textColor, font: { size: 9 } },
                    grid: { display: false },
                    border: { display: false },
                  },
                },
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}


