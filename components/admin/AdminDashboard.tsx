'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, IndianRupee, Loader2, LogOut, Mail, RefreshCw, Search, Users } from 'lucide-react';
import { auth, getRegistrations, getSubmissions, getSubscribers, onAuthStateChanged, signOut, type Registration } from '../../lib/firebase';
import { cn, formatINR } from '../../lib/utils';
import Logo from '../brand/Logo';
import AdminLogin from './AdminLogin';

type Tab = 'registrations' | 'enquiries' | 'subscribers';

function toDate(v: any): Date | null {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v.seconds) return new Date(v.seconds * 1000);
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

function fmt(v: any) {
  const d = toDate(v);
  return d ? d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '';
}

function downloadCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows.length) return;
  const keys = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const escape = (v: any) => {
    const s = v == null ? '' : typeof v === 'object' && v.seconds ? fmt(v) : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [keys.join(','), ...rows.map((r) => keys.map((k) => escape(r[k])).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(undefined);
  const [tab, setTab] = useState<Tab>('registrations');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [r, e, s] = await Promise.all([
        getRegistrations().catch((err) => {
          console.error(err);
          return [];
        }),
        getSubmissions().catch((err) => {
          console.error(err);
          return [];
        }),
        getSubscribers().catch(() => [])
      ]);
      setRegistrations(r);
      setEnquiries(e);
      setSubscribers(s);
    } catch (err: any) {
      setError(err?.message || 'Could not load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const revenue = useMemo(() => registrations.filter((r) => r.status === 'paid').reduce((sum, r) => sum + (Number(r.amount) || 0), 0), [registrations]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const match = (r: any) => !needle || JSON.stringify(r).toLowerCase().includes(needle);
    if (tab === 'registrations') return registrations.filter(match);
    if (tab === 'enquiries') return enquiries.filter(match);
    return subscribers.filter(match);
  }, [tab, q, registrations, enquiries, subscribers]);

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (!user) return <AdminLogin />;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'registrations', label: 'Course registrations', count: registrations.length },
    { key: 'enquiries', label: 'Contact enquiries', count: enquiries.length },
    { key: 'subscribers', label: 'Subscribers', count: subscribers.length }
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-ink-2/60 backdrop-blur">
        <div className="container-x flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="text-xl" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted sm:inline">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={load} className="btn-ghost !px-4 !py-2 text-xs" disabled={loading}>
              <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} /> Refresh
            </button>
            <button onClick={() => signOut(auth)} className="btn-ghost !px-4 !py-2 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: IndianRupee, label: 'Course revenue', value: formatINR(revenue) },
            { icon: Users, label: 'Paid registrations', value: String(registrations.filter((r) => r.status === 'paid').length) },
            { icon: Mail, label: 'Contact enquiries', value: String(enquiries.length) }
          ].map((s) => (
            <div key={s.label} className="card p-6">
              <s.icon className="h-4 w-4 text-brand" />
              <p className="mt-4 font-display text-3xl font-bold text-cream">{s.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition',
                  tab === t.key ? 'border-brand bg-brand text-ink' : 'border-white/10 text-muted hover:text-cream'
                )}
              >
                {t.label} <span className="ml-1 opacity-70">({t.count})</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="input !w-64 !rounded-full !py-2.5 !pl-10" />
            </div>
            <button onClick={() => downloadCSV(`${tab}-${new Date().toISOString().slice(0, 10)}.csv`, filtered)} className="btn-ghost !px-4 !py-2 text-xs">
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
          </div>
        </div>

        {error && <p className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

        <div className="card mt-6 overflow-x-auto">
          {loading ? (
            <div className="flex items-center gap-2 p-8 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading
            </div>
          ) : !filtered.length ? (
            <p className="p-8 text-sm text-muted">Nothing here yet.</p>
          ) : tab === 'registrations' ? (
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <tr>
                  {['Name', 'Contact', 'City / Goal', 'Amount', 'Payment', 'Status', 'Date'].map((h) => (
                    <th key={h} className="px-5 py-4 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {(filtered as Registration[]).map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-medium text-cream">{r.name || '-'}</td>
                    <td className="px-5 py-4 text-muted">
                      {r.email}
                      <br />
                      {r.phone}
                    </td>
                    <td className="px-5 py-4 text-muted">
                      {r.city || '-'}
                      <br />
                      <span className="text-xs">{r.goal}</span>
                    </td>
                    <td className="px-5 py-4 text-cream">{formatINR(Number(r.amount) || 0)}</td>
                    <td className="px-5 py-4 font-mono text-xs text-muted">
                      {r.paymentId}
                      <br />
                      {r.method} · {r.source}
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn('rounded-full px-2.5 py-1 text-xs', r.status === 'paid' ? 'bg-mint/15 text-mint' : 'bg-red-500/15 text-red-300')}>{r.status}</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted">{fmt(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : tab === 'enquiries' ? (
            <div className="divide-y divide-white/[0.06]">
              {filtered.map((it: any) => (
                <div key={it.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-cream">
                        {it.name} {it.company ? <span className="text-muted">· {it.company}</span> : null}
                      </p>
                      <p className="text-sm text-muted">
                        {it.email} {it.phone ? `· ${it.phone}` : ''} {it.budget ? `· ${it.budget}` : ''}
                      </p>
                    </div>
                    <span className="text-xs text-muted">{fmt(it.createdAt)}</span>
                  </div>
                  <p className="mt-3 text-sm text-cream/85">{it.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {filtered.map((it: any) => (
                <div key={it.id} className="flex items-center justify-between p-5 text-sm">
                  <span className="text-cream">{it.email}</span>
                  <span className="text-xs text-muted">{fmt(it.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
