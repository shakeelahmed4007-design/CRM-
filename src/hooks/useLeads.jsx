import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { STORAGE_KEY, isValidStoredLead } from '../utils';
import { useToast } from '../components/Toast';
const LeadsContext = createContext(null);
function readLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { leads: [], storageError: '' };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isValidStoredLead)) throw new Error('Invalid data');
    return { leads: parsed, storageError: '' };
  } catch { return { leads: [], storageError: 'Saved leads could not be read. Your existing saved data has not been overwritten. Check browser storage before adding new leads.' }; }
}
export function leadsReducer(state, action) {
  switch (action.type) {
    case 'add': return [...state, action.lead];
    case 'edit': return state.map(l => l.id === action.lead.id ? action.lead : l);
    case 'status': return state.map(l => l.id === action.id ? { ...l, status: action.status } : l);
    case 'delete': return state.filter(l => l.id !== action.id);
    case 'sample': return state.length ? state : action.leads;
    default: return state;
  }
}
export function LeadsProvider({ children }) {
  const [initial] = useState(readLeads);
  const [leads, dispatch] = useReducer(leadsReducer, initial.leads);
  const [storageError, setStorageError] = useState(initial.storageError);
  const [changed, setChanged] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (!changed) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(leads)); setStorageError(''); }
    catch { setStorageError('Changes are available for this session, but browser storage is unavailable or full. They may not survive a refresh.'); }
  }, [leads, changed]);
  const actions = useMemo(() => ({
    save(values, existing) {
      const lead = { ...values, name: values.name.trim(), email: values.email.trim(), company: values.company.trim(), phone: values.phone.trim(), notes: values.notes.trim(), dealValue: Number(values.dealValue), id: existing?.id || crypto.randomUUID(), createdAt: existing?.createdAt || new Date().toISOString() };
      dispatch({ type: existing ? 'edit' : 'add', lead }); setChanged(true); toast(existing ? 'Lead updated successfully.' : 'New lead added. Let’s make it count!', 'success');
    },
    changeStatus(id, status) { dispatch({ type: 'status', id, status }); setChanged(true); toast(`Lead moved to ${status}.`, 'info'); },
    remove(id) { dispatch({ type: 'delete', id }); setChanged(true); toast('Lead deleted.', 'success'); },
    loadSamples() {
      const base = { phone: '', notes: 'Sample lead — feel free to edit or delete.', createdAt: new Date().toISOString() };
      dispatch({
        type: 'sample', leads: [
          { ...base, id: crypto.randomUUID(), name: 'Alex Morgan', email: 'alex@example.com', company: 'Sample Studio', source: 'Website', status: 'New', priority: 'High', dealValue: 2400 },
          { ...base, id: crypto.randomUUID(), name: 'Jordan Lee', email: 'jordan@example.com', company: 'Sample Works', source: 'Referral', status: 'Proposal', priority: 'Medium', dealValue: 4500 },
          { ...base, id: crypto.randomUUID(), name: 'Sam Rivera', email: 'sam@example.com', company: 'Sample Co.', source: 'Social Media', status: 'Won', priority: 'Low', dealValue: 1800 }
        ]
      }); setChanged(true); toast('Three sample leads added.', 'info');
    }
  }), [toast]);
  return <LeadsContext.Provider value={{ leads, storageError, ...actions }}>{children}</LeadsContext.Provider>;
}
export function useLeads() { return useContext(LeadsContext); }
