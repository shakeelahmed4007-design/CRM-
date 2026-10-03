import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Dashboard, { MetricGrid } from './components/Dashboard.jsx';
import LeadForm from './components/LeadForm.jsx';
import LeadTable from './components/LeadTable.jsx';
import FilterBar from './components/FilterBar.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import LoginPage from './components/LoginPage.jsx';
import Charts from './components/Charts.jsx';
import { useLeads } from './hooks/useLeads.jsx';
import { useToast } from './components/Toast.jsx';
import { filterLeads } from './utils.js';
import { DEFAULT_FILTERS, PREFS_KEY, THEME_KEY, AUTH_KEY } from './constants.js';

function readSavedPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return { view: 'dashboard', filters: DEFAULT_FILTERS };
    const parsed = JSON.parse(raw);
    return {
      view: ['dashboard', 'leads', 'add', 'analytics'].includes(parsed.view)
        ? parsed.view
        : 'dashboard',
      filters: { ...DEFAULT_FILTERS, ...(parsed.filters || {}) },
    };
  } catch {
    return { view: 'dashboard', filters: DEFAULT_FILTERS };
  }
}

export default function App() {
  const { leads, storageError, save, changeStatus, remove, loadSamples } = useLeads();
  const toast = useToast();
  const [initialPrefs] = useState(readSavedPrefs);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [view, setView] = useState(initialPrefs.view);
  const [filters, setFilters] = useState(initialPrefs.filters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [readNotificationIds, setReadNotificationIds] = useState([]);
  const [editingLead, setEditingLead] = useState(null);
  const [deletingLead, setDeletingLead] = useState(null);
  const searchInputRef = useRef(null);

  const handleLogin = (userData, remember = true) => {
    setCurrentUser(userData);
    if (remember) {
      try {
        localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      } catch {
        // storage fallback
      }
    }
    toast(`Welcome to Leadflow, ${userData.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // storage fallback
    }
    setSettingsOpen(false);
    toast('You have signed out.', 'info');
  };

  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch {
      // Theme still works for session
    }
  }, [dark]);

  useEffect(() => {
    try {
      localStorage.setItem(
        PREFS_KEY,
        JSON.stringify({ view, filters })
      );
    } catch {
      // LocalStorage errors handled silently
    }
  }, [view, filters]);

  // Global shortcut: "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        if (view !== 'leads') {
          setView('leads');
        }
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view]);

  useEffect(() => {
    const titleMap = {
      dashboard: 'Dashboard',
      leads: 'Leads',
      add: editingLead ? 'Edit lead' : 'Add lead',
      analytics: 'Analytics',
    };
    document.title = `${titleMap[view] || 'Leads'} · Leadflow`;
  }, [view, editingLead]);

  const visibleLeads = useMemo(() => filterLeads(leads, filters), [leads, filters]);

  const handleNavigate = (nextView) => {
    setEditingLead(null);
    setView(nextView);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setView('add');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSave = (values, existing) => {
    save(values, existing);
    setEditingLead(null);
    setView('leads');
  };

  const handleSort = (type) => {
    setFilters((prev) => {
      if (type === 'value') {
        const nextSort = prev.sort === 'value-desc' ? 'value-asc' : 'value-desc';
        return { ...prev, sort: nextSort };
      }
      const nextSort = prev.sort === 'newest' ? 'oldest' : 'newest';
      return { ...prev, sort: nextSort };
    });
  };

  const headerTitle = editingLead
    ? 'Edit lead'
    : {
      dashboard: 'Dashboard',
      leads: 'Leads',
      add: 'Add lead',
      analytics: 'Analytics',
    }[view];

  if (!currentUser) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-200 text-slate-900 transition-colors duration-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
        <LoginPage onLogin={handleLogin} toast={toast} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-200 text-slate-900 transition-colors duration-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      {/* Fixed Ambient Background Blobs for Glassmorphic Depth */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl opacity-40 dark:bg-blue-600/15" />
        <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl opacity-35 dark:bg-indigo-600/15" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl opacity-30 dark:bg-sky-600/10" />
      </div>

      <a
        href="#main"
        className="sr-only z-[100] rounded-lg bg-blue-600 p-2.5 text-white shadow-md focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <Sidebar
        view={view}
        navigate={handleNavigate}
        open={drawerOpen}
        close={() => setDrawerOpen(false)}
        dark={dark}
        toggleDark={() => setDark((d) => !d)}
        count={leads.length}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div className="lg:pl-64 min-w-0">
        <Header
          title={headerTitle}
          search={filters.search}
          onSearch={(val) => {
            setFilters((f) => ({ ...f, search: val }));
            if (val && view !== 'leads') setView('leads');
          }}
          openMenu={() => setDrawerOpen(true)}
          searchInputRef={searchInputRef}
          leads={leads}
          readNotificationIds={readNotificationIds}
          onMarkAllNotificationsRead={() => {
            setReadNotificationIds([
              'system-ready',
              ...leads.map((l) => `urgent-${l.id}`),
              ...leads.map((l) => `won-${l.id}`),
              ...leads.map((l) => `lead-${l.id}`),
            ]);
            toast('All notifications marked as read', 'info');
          }}
          onSelectLead={handleEdit}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        <main id="main" tabIndex={-1} className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 animate-fade-in">
          {storageError && (
            <div
              role="alert"
              className="mb-4 flex items-center gap-2.5 rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
            >
              <AlertTriangle size={16} className="shrink-0" />
              <span>{storageError}</span>
            </div>
          )}

          {view === 'dashboard' && (
            <Dashboard
              leads={leads}
              dark={dark}
              navigate={handleNavigate}
              onEdit={handleEdit}
              onSamples={loadSamples}
            />
          )}

          {view === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Leads
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Manage and track pipeline opportunities
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-primary text-xs"
                  onClick={() => handleNavigate('add')}
                >
                  <Plus size={15} />
                  Add lead
                </button>
              </div>

              <section className="glass-strong rounded-xl overflow-hidden">
                <FilterBar
                  filters={filters}
                  setFilters={setFilters}
                  clear={() => setFilters(DEFAULT_FILTERS)}
                  searchInputRef={searchInputRef}
                />
                <LeadTable
                  leads={visibleLeads}
                  total={leads.length}
                  sort={filters.sort}
                  onAdd={() => handleNavigate('add')}
                  onClear={() => setFilters(DEFAULT_FILTERS)}
                  onEdit={handleEdit}
                  onDelete={setDeletingLead}
                  onStatus={changeStatus}
                  onSort={handleSort}
                />
              </section>
            </div>
          )}

          {view === 'add' && (
            <div className="mx-auto max-w-2xl">
              <LeadForm
                key={editingLead?.id || 'new'}
                lead={editingLead}
                onSave={handleSave}
                onCancel={() => handleNavigate('leads')}
              />
            </div>
          )}

          {view === 'analytics' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Analytics & Performance
                  </h2>
                </div>
                <span className="glass-subtle rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {leads.length} total records
                </span>
              </div>

              <MetricGrid leads={leads} />
              <Charts leads={leads} dark={dark} />
            </div>
          )}
        </main>
      </div>

      {settingsOpen && (
        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          leads={leads}
          onLogout={handleLogout}
        />
      )}

      {deletingLead && (
        <ConfirmModal
          lead={deletingLead}
          onClose={() => setDeletingLead(null)}
          onConfirm={() => {
            remove(deletingLead.id);
            setDeletingLead(null);
          }}
        />
      )}
    </div>
  );
}
