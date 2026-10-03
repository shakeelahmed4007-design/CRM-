import { useRef, useState } from 'react';
import { UserRound, BriefcaseBusiness, Save, Plus, Info } from 'lucide-react';
import { STATUSES, PRIORITIES, SOURCES, validateLead } from '../utils';
import { useToast } from './Toast';

const empty = {
  name: '',
  email: '',
  phone: '',
  company: '',
  source: 'Website',
  status: 'New',
  priority: 'Medium',
  dealValue: '',
  notes: '',
};

function Field({ label, name, errors, required, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      {children}
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-xs text-rose-600 dark:text-rose-400">
          {errors[name]}
        </p>
      )}
    </div>
  );
}

export default function LeadForm({ lead, onSave, onCancel }) {
  const [values, setValues] = useState(lead || empty);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const formRef = useRef(null);

  function change(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  const attrs = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => change(name, e.target.value),
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: `field ${errors[name] ? '!border-rose-500 !ring-rose-500/30' : ''}`,
  });

  function submit(e) {
    e.preventDefault();
    const next = validateLead(values);
    setErrors(next);
    if (Object.keys(next).length) {
      toast('Please check the highlighted fields.', 'error');
      formRef.current.elements[Object.keys(next)[0]]?.focus();
      return;
    }
    onSave(values, lead);
    if (!lead) setValues(empty);
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="glass-strong rounded-xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200/60 p-5 dark:border-white/10">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          {lead ? 'Edit lead details' : 'Create new lead opportunity'}
        </h2>
      </div>

      <div className="space-y-6 p-6 sm:p-7">
        {/* Contact Information */}
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
            <UserRound size={15} className="text-blue-600 dark:text-blue-400" />
            Contact Information
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" errors={errors} required>
              <input {...attrs('name')} autoComplete="name" placeholder="e.g. Jamie Taylor" required maxLength={120} />
            </Field>
            <Field label="Email address" name="email" errors={errors} required>
              <input {...attrs('email')} type="email" autoComplete="email" placeholder="jamie@company.com" required maxLength={254} />
            </Field>
            <Field label="Phone number" name="phone" errors={errors}>
              <input {...attrs('phone')} type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" maxLength={30} />
            </Field>
            <Field label="Company" name="company" errors={errors}>
              <input {...attrs('company')} autoComplete="organization" placeholder="Company name" maxLength={150} />
            </Field>
          </div>
        </section>

        {/* Opportunity Details */}
        <section className="border-t border-slate-200/60 pt-6 dark:border-white/10">
          <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
            <BriefcaseBusiness size={15} className="text-blue-600 dark:text-blue-400" />
            Opportunity Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Lead source" name="source" errors={errors}>
              <select {...attrs('source')}>
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Deal value (USD)" name="dealValue" errors={errors} required>
              <input {...attrs('dealValue')} type="number" min="0.01" step="0.01" inputMode="decimal" placeholder="0.00" required />
            </Field>
          </div>

          {/* Status Pills */}
          <fieldset className="mt-5">
            <legend className="mb-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              Pipeline Status
            </legend>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => {
                const isActive = values.status === s;
                return (
                  <label
                    key={s}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'glass-subtle text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={isActive}
                      onChange={() => change('status', s)}
                      className="sr-only"
                    />
                    {s}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Priority Pills */}
          <fieldset className="mt-4">
            <legend className="mb-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              Priority Level
            </legend>
            <div className="flex flex-wrap gap-2">
              {PRIORITIES.map((p) => {
                const isActive = values.priority === p;
                return (
                  <label
                    key={p}
                    className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'glass-subtle text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={isActive}
                      onChange={() => change('priority', p)}
                      className="sr-only"
                    />
                    {p}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-4">
            <Field label="Notes & Context" name="notes" errors={errors}>
              <textarea
                {...attrs('notes')}
                rows={3}
                placeholder="Add conversation notes, next actions, or requirements..."
                maxLength={5000}
              />
            </Field>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/60 bg-white/40 px-6 py-4 dark:border-white/10 dark:bg-slate-900/40">
        <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Info size={13} />
          Fields marked * are required
        </p>
        <div className="flex gap-2.5">
          <button type="button" className="btn-secondary text-xs" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs">
            {lead ? <Save size={15} /> : <Plus size={15} />}
            {lead ? 'Save changes' : 'Create lead'}
          </button>
        </div>
      </div>
    </form>
  );
}

