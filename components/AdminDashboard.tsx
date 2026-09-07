'use client';

import React, { useEffect, useState } from 'react';
import { getSubmissions } from '../lib/firebase';

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getSubmissions();
        if (mounted) setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="text-sm text-neutral">Loading submissions…</p>;

  if (!items.length) return <p className="text-sm text-neutral">No submissions yet.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Registrations</h2>
      <div className="grid gap-4">
        {items.map((it) => (
          <div key={it.id} className="rounded-lg border bg-white/5 p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{it.name}</p>
                <p className="text-sm text-neutral">{it.email} {it.phone ? `• ${it.phone}` : ''}</p>
              </div>
              <div className="text-sm text-neutral">{it.createdAt?.toDate ? it.createdAt.toDate().toLocaleString() : ''}</div>
            </div>
            <p className="mt-2 text-sm text-light">{it.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
