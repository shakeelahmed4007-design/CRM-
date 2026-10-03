export const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];
export const PRIORITIES = ['Low', 'Medium', 'High'];
export const SOURCES = ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Other'];
export const STORAGE_KEY = 'leadflow.leads.v1';
export const currency = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);
export const dateLabel = value => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
export const initials = name => name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
export const isOpen = lead => !['Won', 'Lost'].includes(lead.status);
export function metrics(leads) {
  const won = leads.filter(l => l.status === 'Won');
  return { total: leads.length, pipeline: leads.filter(isOpen).reduce((sum, l) => sum + l.dealValue, 0), revenue: won.reduce((sum, l) => sum + l.dealValue, 0), conversion: leads.length ? won.length / leads.length * 100 : 0, high: leads.filter(l => l.priority === 'High').length };
}
export function validateLead(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter a name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (values.phone && (!/^\+?[\d\s().-]+$/.test(values.phone) || values.phone.replace(/\D/g, '').length < 7 || values.phone.replace(/\D/g, '').length > 15)) errors.phone = 'Enter a valid phone number (7–15 digits).';
  if (!String(values.dealValue).trim() || !Number.isFinite(Number(values.dealValue)) || Number(values.dealValue) <= 0) errors.dealValue = 'Deal value must be greater than zero.';
  return errors;
}
export function filterLeads(leads, { search = '', status = '', priority = '', sort = 'newest' }) {
  const term = search.trim().toLowerCase();
  return leads.filter(l => (!term || [l.name, l.email, l.company].some(value => value.toLowerCase().includes(term))) && (!status || l.status === status) && (!priority || l.priority === priority)).sort((a, b) => sort === 'value-desc' ? b.dealValue - a.dealValue : sort === 'value-asc' ? a.dealValue - b.dealValue : sort === 'oldest' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));
}
export function isValidStoredLead(l) {
  return l && ['id', 'name', 'email', 'phone', 'company', 'notes', 'createdAt'].every(k => typeof l[k] === 'string') && STATUSES.includes(l.status) && PRIORITIES.includes(l.priority) && SOURCES.includes(l.source) && Number.isFinite(l.dealValue) && l.dealValue > 0 && !Number.isNaN(Date.parse(l.createdAt));
}
