export default function MetricCard({ label, value, icon: Icon, detail, hasDot, dotColor = 'bg-amber-500' }) {
  return (
    <div className="flex flex-col justify-between p-4 sm:p-5 transition-colors duration-150 hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
        {Icon && <Icon size={18} className="text-blue-600 dark:text-blue-400 shrink-0 stroke-[1.8]" />}
        <span className="truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
          {label}
        </span>
      </div>

      <div className="mt-2.5">
        <p className="truncate text-2xl sm:text-3xl font-normal tracking-tight text-slate-800 dark:text-slate-100 tabular-nums">
          {value}
        </p>
      </div>

      {detail && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium truncate">
          {hasDot && <span className={`h-2 w-2 rounded-full ${dotColor} shrink-0`} />}
          <span>{detail}</span>
        </div>
      )}
    </div>
  );
}



