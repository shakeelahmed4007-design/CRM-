import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function Toast({ item, dismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => dismiss(item.id), 3000);
    return () => clearTimeout(timer);
  }, [item.id, dismiss]);

  const Icon = item.type === 'error' ? AlertCircle : item.type === 'success' ? CheckCircle2 : Info;
  const borderColors = {
    error: 'border-l-rose-500',
    success: 'border-l-emerald-500',
    info: 'border-l-blue-600',
  };
  const iconColors = {
    error: 'text-rose-500',
    success: 'text-emerald-500',
    info: 'text-blue-600',
  };

  return (
    <div
      role={item.type === 'error' ? 'alert' : 'status'}
      className={`glass-strong pointer-events-auto flex items-start gap-3 rounded-xl border-l-4 ${
        borderColors[item.type] || borderColors.info
      } p-4 shadow-xl motion-safe:animate-slide-in`}
    >
      <Icon size={18} className={`mt-0.5 shrink-0 ${iconColors[item.type] || iconColors.info}`} />
      <p className="flex-1 text-xs font-medium text-slate-800 dark:text-slate-100">{item.message}</p>
      <button
        onClick={() => dismiss(item.id)}
        aria-label="Dismiss notification"
        className="rounded-lg p-1 text-slate-400 hover:bg-white/80 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const show = useCallback((message, type = 'success') => {
    setItems((current) => [...current.slice(-3), { id: crypto.randomUUID(), message, type }]);
  }, []);
  const dismiss = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2.5">
        {items.map((item) => (
          <Toast key={item.id} item={item} dismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

