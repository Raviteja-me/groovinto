'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Lock, MessageCircle, ShieldCheck } from 'lucide-react';
import { COURSE } from '../../lib/course';
import { siteConfig } from '../../lib/data';
import { EASE, formatINR } from '../../lib/utils';
import { loadRazorpay } from './razorpay-client';

type Status = 'idle' | 'creating' | 'paying' | 'verifying' | 'success' | 'error';

const GOALS = ['Reels & Shorts for my brand', 'Freelance AI video services', 'YouTube channel', 'Ads for clients', 'Learning for fun'];

const initialForm = { name: '', email: '', phone: '', city: '', goal: GOALS[0] };

export default function RegisterForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ paymentId: string; orderId: string } | null>(null);

  const busy = status === 'creating' || status === 'paying' || status === 'verifying';
  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus('creating');

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not start the payment.');

      await loadRazorpay();
      if (!window.Razorpay) throw new Error('Razorpay is not available right now.');

      setStatus('paying');
      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'GROOVINTO',
        description: data.courseName,
        image: `${window.location.origin}/logo/logo-full.png`,
        order_id: data.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { name: form.name, email: form.email, phone: form.phone, city: form.city, goal: form.goal, course: COURSE.id },
        theme: { color: '#FF6A00', backdrop_color: 'rgba(7,7,10,0.85)' },
        retry: { enabled: true },
        modal: {
          ondismiss: () => {
            setStatus((s) => (s === 'paying' ? 'idle' : s));
          }
        },
        handler: async (response) => {
          setStatus('verifying');
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...response, ...form })
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'We received the payment but could not verify it. Please contact us with your payment id.');
            }
            setResult({ paymentId: verifyData.paymentId, orderId: verifyData.orderId });
            setStatus('success');
          } catch (err: any) {
            setError(`${err.message} (Payment ID: ${response.razorpay_payment_id})`);
            setStatus('error');
          }
        }
      });

      rzp.on('payment.failed', (resp) => {
        setError(resp?.error?.description || 'Payment failed. You can try again with another method.');
        setStatus('error');
      });

      rzp.open();
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  return (
    <div id="register" className="card overflow-hidden border-brand/20 p-7 sm:p-9">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
      <AnimatePresence mode="wait">
        {status === 'success' && result ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mint/15 text-mint shadow-glow-mint"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            <h3 className="mt-6 font-display text-3xl font-bold text-cream">You&apos;re in, {form.name.split(' ')[0]}!</h3>
            <p className="mt-3 text-sm text-muted">
              Your seat in the {COURSE.name} is confirmed. We will WhatsApp and email your onboarding details within 24 hours.
            </p>
            <dl className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left font-mono text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Payment ID</dt>
                <dd className="text-cream">{result.paymentId}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Order ID</dt>
                <dd className="text-cream">{result.orderId}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Amount</dt>
                <dd className="text-cream">{formatINR(COURSE.price)}</dd>
              </div>
            </dl>
            <a
              href={`${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi GROOVINTO, I just registered for the ${COURSE.name}. Payment ID: ${result.paymentId}`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-mint mt-6 w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Say hi on WhatsApp
            </a>
            <Link href="/" className="mt-3 inline-block text-sm text-muted hover:text-cream">
              Back to home
            </Link>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="relative space-y-5" exit={{ opacity: 0, y: -10 }}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Reserve your seat</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-cream">Register now</h3>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-extrabold text-cream">{formatINR(COURSE.price)}</p>
                <p className="text-xs text-muted line-through">{formatINR(COURSE.originalPrice)}</p>
              </div>
            </div>

            <div>
              <label className="label" htmlFor="name">
                Full name
              </label>
              <input id="name" required minLength={2} value={form.name} onChange={update('name')} className="input" placeholder="Your name" autoComplete="name" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input id="email" required type="email" value={form.email} onChange={update('email')} className="input" placeholder="you@email.com" autoComplete="email" />
              </div>
              <div>
                <label className="label" htmlFor="phone">
                  WhatsApp number
                </label>
                <input id="phone" required type="tel" value={form.phone} onChange={update('phone')} className="input" placeholder="+91 98765 43210" autoComplete="tel" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="city">
                  City
                </label>
                <input id="city" value={form.city} onChange={update('city')} className="input" placeholder="Bengaluru" autoComplete="address-level2" />
              </div>
              <div>
                <label className="label" htmlFor="goal">
                  I want to create
                </label>
                <select id="goal" value={form.goal} onChange={update('goal')} className="input appearance-none">
                  {GOALS.map((g) => (
                    <option key={g} value={g} className="bg-ink-2">
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </motion.p>
            )}

            <button type="submit" disabled={busy} className="btn-primary w-full !py-4 text-base disabled:cursor-wait disabled:opacity-70">
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {status === 'creating' ? 'Preparing payment...' : status === 'verifying' ? 'Confirming payment...' : 'Complete payment in the popup'}
                </>
              ) : (
                <>
                  Pay {formatINR(COURSE.price)} & reserve seat
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-mint" /> Secured by Razorpay
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-mint" /> UPI · Cards · Net banking · Wallets
              </span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
