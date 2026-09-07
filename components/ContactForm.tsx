'use client';

import { useState } from 'react';
import { addSubmission } from '../lib/firebase';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: (fd.get('name') as string) || '',
      email: (fd.get('email') as string) || '',
      phone: (fd.get('phone') as string) || '',
      message: (fd.get('message') as string) || ''
    };

    try {
      await addSubmission(payload);
      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError('Unable to save submission. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <p className="text-sm text-green-400">Thanks! Your registration was received.</p>;
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm text-neutral">Name</label>
        <input
          required
          name="name"
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-light outline-none placeholder:text-neutral"
          placeholder="Your full name"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral">Email</label>
          <input
            required
            type="email"
            name="email"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-light outline-none placeholder:text-neutral"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="text-sm text-neutral">Phone</label>
          <input
            name="phone"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-light outline-none placeholder:text-neutral"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
      </div>
      <div>
        <label className="text-sm text-neutral">Project Goals</label>
        <textarea
          required
          name="message"
          rows={4}
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-light outline-none placeholder:text-neutral"
          placeholder="Tell us about your goals, timeline, and budget."
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="button-glow rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-light shadow-glow transition hover:scale-105 disabled:opacity-60"
      >
        {submitting ? 'Sending...' : 'Submit'}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
