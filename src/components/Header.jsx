import { useState } from 'react';
import { Menu, Search, X, Bell } from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';

export default function Header({
  title,
  search,
  onSearch,
  openMenu,
  searchInputRef,
  leads = [],
  readNotificationIds = [],
  onMarkAllNotificationsRead,
  onSelectLead,
  onOpenSettings,
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Check how many unread
  const urgentCount = leads.filter((l) => l.priority === 'High').length;
  const wonCount = leads.filter((l) => l.status === 'Won').length;
  const totalNotifs = Math.min(urgentCount + wonCount + 2, 6);
  const unreadCount = Math.max(0, totalNotifs - readNotificationIds.length);

  return (
    <header className="sticky top-0 z-20 flex min-h-[72px] flex-wrap items-center gap-4 border-b border-white/40 bg-white/60 px-5 py-3.5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:px-8">
      <button
        onClick={openMenu}
        className="rounded-lg p-2 text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-800/60 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="mr-auto">
        <h1 className="text-xl font-extrabold tracking-wide text-slate-900 dark:text-white sm:text-2xl uppercase">
          {title}
        </h1>
      </div>

      <div className="group relative order-3 flex w-full items-center sm:order-none sm:w-72 xl:w-80">
        <Search size={15} className="pointer-events-none absolute left-3 text-slate-400 transition-colors group-focus-within:text-blue-600 dark:text-slate-400 dark:group-focus-within:text-blue-400" />
        <input
          ref={searchInputRef}
          aria-label="Search all leads"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search leads... (Press /)"
          className="field pl-9 pr-8 text-xs"
        />
        {search && (
          <button
            aria-label="Clear search"
            onClick={() => onSearch('')}
            className="absolute right-2.5 rounded-md p-1 text-slate-400 hover:bg-white/70 hover:text-slate-700 dark:hover:bg-slate-800"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <button
            aria-label="Notifications"
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className={`glass-subtle relative h-9 w-9 items-center justify-center rounded-xl transition-all duration-150 flex ${
              notificationsOpen
                ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400'
                : 'text-slate-600 hover:bg-white/80 dark:text-slate-300 dark:hover:bg-slate-800/80'
            }`}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
              </span>
            )}
          </button>

          <NotificationsDropdown
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
            leads={leads}
            readIds={readNotificationIds}
            onMarkAllRead={onMarkAllNotificationsRead}
            onSelectLead={onSelectLead}
          />
        </div>

        <span className="hidden h-6 w-px bg-slate-200/80 dark:bg-slate-800 sm:block" />

        <button
          onClick={onOpenSettings}
          aria-label="User profile and settings"
          title="Open Workspace Settings"
          className="glass-subtle flex items-center gap-2.5 rounded-xl p-1.5 pr-3.5 transition-all duration-150 hover:bg-white/90 dark:hover:bg-slate-800/80 cursor-pointer text-left"
        >
          <div className="relative shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-xs">
              SA
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
              Shakeel Ahmed
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5">
              Admin
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}


