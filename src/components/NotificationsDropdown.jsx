import { useEffect, useRef } from 'react';
import { Bell, CheckCheck, Trash2, Trophy, Flame, UserPlus, Sparkles, X } from 'lucide-react';
import { currency } from '../utils';

export default function NotificationsDropdown({
  isOpen,
  onClose,
  leads = [],
  readIds = [],
  onMarkAllRead,
  onClear,
  onSelectLead,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build notifications from leads
  const items = [];

  const urgentLeads = leads.filter((l) => l.priority === 'High');
  urgentLeads.slice(0, 2).forEach((l) => {
    items.push({
      id: `urgent-${l.id}`,
      type: 'urgent',
      title: 'High Priority Attention Needed',
      message: `${l.name} (${currency(l.value || l.dealValue || 0)}) is marked Urgent in ${l.status}.`,
      time: '10m ago',
      icon: Flame,
      iconColor: 'text-amber-600 bg-amber-50 dark:bg-amber-500/20 dark:text-amber-400',
      lead: l,
    });
  });

  const wonLeads = leads.filter((l) => l.status === 'Won');
  wonLeads.slice(0, 2).forEach((l) => {
    items.push({
      id: `won-${l.id}`,
      type: 'won',
      title: 'Deal Closed Won!',
      message: `Successfully closed deal with ${l.name} for ${currency(l.value || l.dealValue || 0)}.`,
      time: '1h ago',
      icon: Trophy,
      iconColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/20 dark:text-emerald-400',
      lead: l,
    });
  });

  const recentLeads = leads.slice(0, 2);
  recentLeads.forEach((l) => {
    if (!items.some((it) => it.lead?.id === l.id)) {
      items.push({
        id: `lead-${l.id}`,
        type: 'new',
        title: 'Pipeline Lead Active',
        message: `${l.name} is currently in stage ${l.status}.`,
        time: '2h ago',
        icon: UserPlus,
        iconColor: 'text-blue-600 bg-blue-50 dark:bg-blue-500/20 dark:text-blue-400',
        lead: l,
      });
    }
  });

  items.push({
    id: 'system-ready',
    type: 'system',
    title: 'CRM Workspace Synchronized',
    message: `${leads.length} active leads loaded with secure localStorage backup.`,
    time: 'Today',
    icon: Sparkles,
    iconColor: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/20 dark:text-indigo-400',
  });

  const unreadCount = items.filter((it) => !readIds.includes(it.id)).length;

  return (
    <div
      ref={panelRef}
      className="glass-strong animate-scale-in absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl p-4 shadow-2xl border border-white/60 dark:border-white/15"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-3 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-600 text-white px-2 py-0.2 text-[10px] font-bold">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              title="Mark all as read"
              className="rounded p-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <CheckCheck size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 py-1">
        {items.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
            No notifications right now.
          </div>
        ) : (
          items.map((item) => {
            const isRead = readIds.includes(item.id);
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.lead && onSelectLead) {
                    onSelectLead(item.lead);
                    onClose();
                  }
                }}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-150 cursor-pointer ${
                  isRead
                    ? 'opacity-70 hover:opacity-100 hover:bg-white/60 dark:hover:bg-slate-800/40'
                    : 'bg-white/50 dark:bg-white/[0.03] hover:bg-white/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconColor}`}>
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                    {item.message}
                  </p>
                </div>
                {!isRead && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600 mt-1" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="mt-2 border-t border-slate-200/70 pt-2 dark:border-white/10 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 font-medium">Real-time Leadflow Alerts</span>
        <button
          onClick={onMarkAllRead}
          className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Mark all read
        </button>
      </div>
    </div>
  );
}
