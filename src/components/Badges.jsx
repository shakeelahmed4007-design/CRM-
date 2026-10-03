import { Globe, Users2, Share2, Mail, PhoneCall, Sparkles } from 'lucide-react';

export const statusConfig = {
  New: {
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  Contacted: {
    text: 'text-cyan-700 dark:text-cyan-300',
    dot: 'bg-cyan-500',
  },
  Qualified: {
    text: 'text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
  },
  Proposal: {
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  Won: {
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  Lost: {
    text: 'text-rose-700 dark:text-rose-300',
    dot: 'bg-rose-500',
  },
};

export const priorityConfig = {
  Low: {
    text: 'text-slate-600 dark:text-slate-300',
    dot: 'bg-slate-400',
  },
  Medium: {
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  High: {
    text: 'text-rose-700 dark:text-rose-300',
    dot: 'bg-rose-500',
  },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.New;
  return (
    <span className={`glass-subtle inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium border border-slate-200/50 dark:border-white/10 ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const config = priorityConfig[priority] || priorityConfig.Low;
  return (
    <span className={`glass-subtle inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border border-slate-200/50 dark:border-white/10 ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {priority}
    </span>
  );
}

export function SourceBadge({ source }) {
  const getSourceIcon = (src) => {
    switch (src) {
      case 'Website':
        return Globe;
      case 'Referral':
        return Users2;
      case 'Social Media':
        return Share2;
      case 'Email Campaign':
        return Mail;
      case 'Cold Call':
        return PhoneCall;
      default:
        return Sparkles;
    }
  };

  const Icon = getSourceIcon(source);

  return (
    <span className="glass-subtle inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-white/10">
      <Icon size={12} className="shrink-0 text-slate-500 dark:text-slate-400" />
      <span>{source || 'Website'}</span>
    </span>
  );
}


