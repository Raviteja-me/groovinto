'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { addSubmission } from '../../lib/firebase';

const BUDGETS = ['Under ₹1L', '₹1L - ₹3L', '₹3L - ₹10L', '₹10L+', 'Not sure yet'];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await addSubmission({
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
        company: String(fd.get('company') || ''),
        budget: String(fd.get('budget') || ''),
        message: String(fd.get('message') || '')
      });
      setStatus('done');
      form.reset();
    } catch (err) {
      console.error(err);
      setError('Could not send your message. Please try again or WhatsApp us.');
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint/15 text-mint shadow-glow-mint">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-cream">Message received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">Thanks for reaching out. We will get back within one business day.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-brand">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-name">
            Name
          </label>
          <input id="c-name" required name="name" className="input" placeholder="Your full name" autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="c-company">
            Company
          </label>
          <input id="c-company" name="company" className="input" placeholder="Brand or company" autoComplete="organization" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-email">
            Email
          </label>
          <input id="c-email" required type="email" name="email" className="input" placeholder="you@company.com" autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="c-phone">
            Phone
          </label>
          <input id="c-phone" name="phone" type="tel" className="input" placeholder="+91 98765 43210" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="c-budget">
          Budget
        </label>
        <select id="c-budget" name="budget" className="input appearance-none" defaultValue={BUDGETS[4]}>
          {BUDGETS.map((b) => (
            <option key={b} value={b} className="bg-ink-2">
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="c-message">
          Project goals
        </label>
        <textarea id="c-message" required name="message" rows={5} className="input resize-none" placeholder="Tell us about your goals, timeline and what success looks like." />
      </div>
      {error && <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full !py-4 text-base disabled:opacity-70 sm:w-auto">
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send message <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
