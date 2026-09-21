'use client';

import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../lib/firebase';

const ADMIN_EMAIL = 'admin@groovinto.com';
const ADMIN_PASSWORD = 'Shenoy@123';

export default function AdminLoginOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const createAdmin = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      alert('Admin account created. Please sign in.');
    } catch (err: any) {
      setError(err.message || 'Unable to create admin');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-white/5 p-6">
        <h3 className="text-lg font-semibold">Admin Access</h3>
        <p className="text-sm text-neutral mt-2">Hidden admin controls. Use with caution.</p>

        <div className="mt-4 grid gap-3">
          <div className="text-sm">Admin email: <strong>{ADMIN_EMAIL}</strong></div>
          <div className="text-sm">Password: <strong>{ADMIN_PASSWORD}</strong></div>
          {error && <div className="text-sm text-red-400">{error}</div>}

          <div className="flex gap-2">
            <button onClick={createAdmin} disabled={loading} className="rounded bg-green-600 px-3 py-2 text-sm">
              {loading ? 'Working...' : 'Create Admin'}
            </button>
            <button onClick={signIn} disabled={loading} className="rounded bg-blue-600 px-3 py-2 text-sm">
              {loading ? 'Signing...' : 'Sign In'}
            </button>
            <button onClick={handleSignOut} className="rounded bg-gray-600 px-3 py-2 text-sm">Sign Out</button>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="text-sm text-neutral">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
