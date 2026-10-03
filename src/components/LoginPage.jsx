import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { LeadflowLogo } from './Sidebar';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('shakeel@leadflow.io');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const userData = {
        name: email.toLowerCase().includes('shakeel') ? 'Shakeel Ahmed' : email.split('@')[0],
        email: email.trim(),
        role: 'Admin',
        avatar: 'SA',
        loginTime: new Date().toISOString(),
      };

      onLogin(userData, rememberMe);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-[100px] dark:bg-blue-600/10" />
      </div>

      <div className="w-full max-w-sm animate-scale-in">
        {/* Simple Glass Card */}
        <div className="glass-strong rounded-2xl p-6 sm:p-8 shadow-xl border border-white/70 dark:border-white/10">
          {/* Logo & Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <LeadflowLogo size={22} />
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-base font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
                LEADFLOW
              </span>
              <span className="glass-subtle rounded px-1.5 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase">
                CRM
              </span>
            </div>
            <h1 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
              Sign in to your account
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email
              </label>
              <div className="relative flex items-center">
                <Mail size={15} className="pointer-events-none absolute left-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="field pl-9 pr-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={15} className="pointer-events-none absolute left-3 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="field pl-9 pr-9 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Remember me
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2 text-xs font-bold mt-2"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
