'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Download, IndianRupee, Loader2, LogOut, Mail, RefreshCw, Search, Users } from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';
import Logo from '../brand/Logo';
import AdminLogin from './AdminLogin';

type Tab = 'registrations' | 'enquiries' | 'subscribers';
type Data = {
  registrations: any[];
  enquiries: any[];
  subscribers: any[];
  failures: any[];
  razorpay: { connected: boolean; error: string | null; mode: 'live' | 'test' };
  storage: string;
};

const fmt = (v: any) => {
  const d = v ? new Date(v) : null;
  return d && !isNaN(d.getTime()) ? d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '';
};

function downloadCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows.length) return;
  const keys = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const esc = (v: any) => `"${(v == null ? '' : String(v)).replace(/"/g, '""')}"`;
  const csv = [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function AdminDashboard() {
  const [auth, setAuth] = useState<'checking' | 'in' | 'out'>('checking');
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('registrations');
  const [q, setQ] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data', { cache: 'no-store' });
      if (res.status === 401) return setAuth('out');
      setData(await res.json());
      setAuth('in');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setData(null);
    setAuth('out');
  };

  const paid = useMemo(() => (data?.registrations || []).filter((r) => r.status === 'paid'), [data]);
  const revenue = paid.reduce((s, r) => s + (Number(r.amount) || 0), 0);

  const rows = useMemo(() => {
    const list = data ? data[tab] : [];
    const needle = q.trim().toLowerCase();
    return needle ? list.filter((r: any) => JSON.stringify(r).toLowerCase().includes(needle)) : list;
  }, [data, tab, q]);

  if (auth === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (auth === 'out') return <AdminLogin onSuccess={load} />;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'registrations', label: 'Course registrations', count: data?.registrations.length || 0 },
    { key: 'enquiries', label: 'Contact enquiries', count: data?.enquiries.length || 0 },
    { key: 'subscribers', label: 'Subscribers', count: data?.subscribers.length || 0 }
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
            <button onClick={load} disabled={loading} className="btn-ghost !px-4 !py-2 text-xs">
              <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} /> Refresh
            </button>
            <button onClick={logout} className="btn-ghost !px-4 !py-2 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-10">
        <div className="mb-6 flex flex-wrap gap-2 text-xs">
          <span className={cn('pill', data?.razorpay.connected ? 'border-mint/30 text-mint' : 'border-red-500/30 text-red-300')}>
            Razorpay: {data?.razorpay.connected ? `connected (${data.razorpay.mode} mode)` : 'keys missing'}
          </span>
          <span className="pill">Storage: {data?.storage === 'netlify-blobs' ? 'Netlify Blobs' : 'local files'}</span>
        </div>
        {data?.razorpay.error && (
          <p className="mb-6 flex items-center gap-2 rounded-2xl border border-amber/30 bg-amber/10 p-3 text-sm text-amber">
            <AlertTriangle className="h-4 w-4" /> Razorpay: {data.razorpay.error}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: IndianRupee, label: 'Course revenue', value: formatINR(revenue) },
            { icon: Users, label: 'Paid registrations', value: String(paid.length) },
            { icon: Mail, label: 'Contact enquiries', value: String(data?.enquiries.length || 0) }
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
              <button key={t.key} onClick={() => setTab(t.key)} className={cn('rounded-full border px-4 py-2 text-sm transition', tab === t.key ? 'border-brand bg-brand text-ink' : 'border-white/10 text-muted hover:text-cream')}>
                {t.label} <span className="opacity-70">({t.count})</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="input !w-56 !rounded-full !py-2.5 !pl-10" />
            </div>
            <button onClick={() => downloadCSV(`${tab}-${new Date().toISOString().slice(0, 10)}.csv`, rows)} className="btn-ghost !px-4 !py-2 text-xs">
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
          </div>
        </div>

        <div className="card mt-6 overflow-x-auto">
          {!rows.length ? (
            <p className="p-8 text-sm text-muted">Nothing here yet.</p>
          ) : tab === 'registrations' ? (
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <tr>{['Name', 'Contact', 'City / Goal', 'Amount', 'Payment', 'Status', 'Date'].map((h) => <th key={h} className="px-5 py-4 font-normal">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {rows.map((r: any) => (
                  <tr key={r.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-medium text-cream">{r.name || '-'}</td>
                    <td className="px-5 py-4 text-muted">{r.email}<br />{r.phone}</td>
                    <td className="px-5 py-4 text-muted">{r.city || '-'}<br /><span className="text-xs">{r.goal}</span></td>
                    <td className="px-5 py-4 text-cream">{formatINR(Number(r.amount) || 0)}</td>
                    <td className="px-5 py-4 font-mono text-xs text-muted">{r.paymentId}<br />{[r.method, r.source].filter(Boolean).join(' · ')}</td>
                    <td className="px-5 py-4">
                      <span className={cn('rounded-full px-2.5 py-1 text-xs', r.status === 'paid' ? 'bg-mint/15 text-mint' : r.status === 'failed' ? 'bg-red-500/15 text-red-300' : 'bg-amber/15 text-amber')} title={r.reason || ''}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted">{fmt(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : tab === 'enquiries' ? (
            <div className="divide-y divide-white/[0.06]">
              {rows.map((it: any) => (
                <div key={it.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-cream">{it.name} {it.company && <span className="text-muted">· {it.company}</span>}</p>
                      <p className="text-sm text-muted">{[it.email, it.phone, it.budget].filter(Boolean).join(' · ')}</p>
                    </div>
                    <span className="text-xs text-muted">{fmt(it.createdAt)}</span>
                  </div>
                  <p className="mt-3 text-sm text-cream/85">{it.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {rows.map((it: any) => (
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
