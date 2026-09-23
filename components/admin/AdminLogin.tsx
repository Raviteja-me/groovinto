'use client';

import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import Logo from '../brand/Logo';

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="glow-orb left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 bg-brand/20" />
      <form onSubmit={submit} className="card relative w-full max-w-md p-8 sm:p-10">
        <Logo className="text-2xl" />
        <div className="mt-8 flex items-center gap-2 text-muted">
          <Lock className="h-4 w-4" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">Admin access</p>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold text-cream">Sign in</h1>
        <div className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="a-user">Username</label>
            <input id="a-user" required value={username} onChange={(e) => setUsername(e.target.value)} className="input" autoComplete="username" />
          </div>
          <div>
            <label className="label" htmlFor="a-pass">Password</label>
            <input id="a-pass" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" autoComplete="current-password" />
          </div>
        </div>
        {error && <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-70">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
