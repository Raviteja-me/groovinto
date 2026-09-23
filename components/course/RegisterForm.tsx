'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Lock, MessageCircle, Pencil, ShieldCheck } from 'lucide-react';
import { COURSE } from '../../lib/course';
import { siteConfig } from '../../lib/data';
import { EASE, cn, formatINR } from '../../lib/utils';
import { loadRazorpay } from './razorpay-client';

type Step = 'details' | 'review' | 'success';
type PayStatus = 'idle' | 'creating' | 'paying' | 'verifying';

const GOALS = ['Reels & Shorts for my brand', 'Freelance AI video services', 'YouTube channel', 'Ads for clients', 'Learning for fun'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', goal: GOALS[0] });
  const [step, setStep] = useState<Step>('details');
  const [pay, setPay] = useState<PayStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ paymentId: string; orderId: string } | null>(null);

  const busy = pay !== 'idle';
  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.name.trim().length < 2) return setError('Please enter your full name.');
    if (!EMAIL_RE.test(form.email.trim())) return setError('Please enter a valid email address.');
    if (form.phone.replace(/\D/g, '').length < 10) return setError('Please enter a valid 10-digit phone number.');
    setStep('review');
  };

  const payNow = async () => {
    setError(null);
    setPay('creating');
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

      setPay('paying');
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
        modal: { ondismiss: () => setPay((s) => (s === 'paying' ? 'idle' : s)) },
        handler: async (response) => {
          setPay('verifying');
          try {
            const vr = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...response, ...form })
            });
            const vd = await vr.json();
            if (!vr.ok || !vd.success) throw new Error(vd.error || 'We received the payment but could not verify it.');
            setResult({ paymentId: vd.paymentId, orderId: vd.orderId });
            setStep('success');
          } catch (err: any) {
            setError(`${err.message} Please contact us with Payment ID ${response.razorpay_payment_id}.`);
          } finally {
            setPay('idle');
          }
        }
      });
      rzp.on('payment.failed', (resp) => {
        setError(resp?.error?.description || 'Payment failed. Please try again or use another method.');
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
      setPay('idle');
    }
  };

  return (
    <div id="register" className="card overflow-hidden border-brand/20 p-7 sm:p-9">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />

      {step !== 'success' && (
        <div className="relative mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
          {['Your details', 'Review & pay'].map((label, i) => {
            const active = (i === 0 && step === 'details') || (i === 1 && step === 'review');
            const done = i === 0 && step === 'review';
            return (
              <div key={label} className="flex items-center gap-3">
                <span className={cn('flex h-6 w-6 items-center justify-center rounded-full border', active ? 'border-brand bg-brand text-ink' : done ? 'border-mint text-mint' : 'border-white/15 text-muted')}>
                  {done ? '✓' : i + 1}
                </span>
                <span className={active ? 'text-cream' : 'text-muted'}>{label}</span>
                {i === 0 && <span className="h-px w-6 bg-white/15" />}
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'details' && (
          <motion.form key="details" onSubmit={toReview} noValidate className="relative space-y-5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: EASE }}>
            <h3 className="font-display text-2xl font-bold text-cream">Reserve your seat</h3>
            <div>
              <label className="label" htmlFor="name">Full name</label>
              <input id="name" value={form.name} onChange={update('name')} className="input" placeholder="Your name" autoComplete="name" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="email">Email</label>
                <input id="email" type="email" value={form.email} onChange={update('email')} className="input" placeholder="you@email.com" autoComplete="email" />
              </div>
              <div>
                <label className="label" htmlFor="phone">WhatsApp number</label>
                <input id="phone" type="tel" value={form.phone} onChange={update('phone')} className="input" placeholder="98765 43210" autoComplete="tel" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="city">City</label>
                <input id="city" value={form.city} onChange={update('city')} className="input" placeholder="Bengaluru" autoComplete="address-level2" />
              </div>
              <div>
                <label className="label" htmlFor="goal">I want to create</label>
                <select id="goal" value={form.goal} onChange={update('goal')} className="input appearance-none">
                  {GOALS.map((g) => (
                    <option key={g} value={g} className="bg-ink-2">{g}</option>
                  ))}
                </select>
              </div>
            </div>
            {error && <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
            <button type="submit" className="btn-primary w-full !py-4 text-base">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>
        )}

        {step === 'review' && (
          <motion.div key="review" className="relative space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4, ease: EASE }}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-cream">{form.name}</p>
                  <p className="text-muted">{form.email}</p>
                  <p className="text-muted">{form.phone}{form.city ? ` · ${form.city}` : ''}</p>
                </div>
                <button onClick={() => setStep('details')} disabled={busy} className="flex items-center gap-1 text-xs text-brand">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>{COURSE.name}</span>
                <span className="line-through">{formatINR(COURSE.originalPrice)}</span>
              </div>
              <div className="flex justify-between text-mint">
                <span>Launch discount</span>
                <span>-{formatINR(COURSE.originalPrice - COURSE.price)}</span>
              </div>
              <div className="divider" />
              <div className="flex items-end justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Total</span>
                <span className="font-display text-5xl font-extrabold tracking-tight text-cream">{formatINR(COURSE.price)}</span>
              </div>
            </div>

            {error && <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

            <button onClick={payNow} disabled={busy} className="btn-primary w-full !py-4 text-base disabled:cursor-wait disabled:opacity-70">
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {pay === 'creating' ? 'Preparing payment...' : pay === 'verifying' ? 'Confirming payment...' : 'Complete payment in the popup'}
                </>
              ) : (
                <>Pay now {formatINR(COURSE.price)}</>
              )}
            </button>
            <button onClick={() => setStep('details')} disabled={busy} className="flex w-full items-center justify-center gap-1 text-xs text-muted hover:text-cream">
              <ArrowLeft className="h-3 w-3" /> Back
            </button>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-mint" /> Secured by Razorpay</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-mint" /> UPI · Cards · Net banking</span>
            </div>
          </motion.div>
        )}

        {step === 'success' && result && (
          <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="relative text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mint/15 text-mint shadow-glow-mint">
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            <h3 className="mt-6 font-display text-3xl font-bold text-cream">You&apos;re in, {form.name.split(' ')[0]}!</h3>
            <p className="mt-3 text-sm text-muted">Your seat is confirmed. We will send onboarding details on WhatsApp and email within 24 hours.</p>
            <dl className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left font-mono text-xs">
              <div className="flex justify-between gap-4"><dt className="text-muted">Payment ID</dt><dd className="text-cream">{result.paymentId}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Amount</dt><dd className="text-cream">{formatINR(COURSE.price)}</dd></div>
            </dl>
            <a href={`${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi GROOVINTO, I registered for the ${COURSE.name}. Payment ID: ${result.paymentId}`)}`} target="_blank" rel="noreferrer" className="btn-mint mt-6 w-full">
              <MessageCircle className="h-4 w-4" /> Say hi on WhatsApp
            </a>
            <Link href="/" className="mt-3 inline-block text-sm text-muted hover:text-cream">Back to home</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
