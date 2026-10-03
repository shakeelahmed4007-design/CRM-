export const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];
export const PRIORITIES = ['Low', 'Medium', 'High'];
export const SOURCES = ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Other'];

export const STORAGE_KEY = 'leadflow.leads.v1';
export const PREFS_KEY = 'leadflow.prefs.v1';
export const THEME_KEY = 'leadflow.theme';
export const AUTH_KEY = 'leadflow.auth.user';

export const DEFAULT_FILTERS = {
  search: '',
  status: '',
  priority: '',
  sort: 'newest',
};

export const STAGE_COLORS = [
  '#0d9488', // teal-600 (New)
  '#0284c7', // sky-600 (Contacted)
  '#6366f1', // indigo-500 (Qualified)
  '#d97706', // amber-600 (Proposal)
  '#16a34a', // green-600 (Won)
  '#e11d48', // rose-600 (Lost)
];
