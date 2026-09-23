'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { navLinks, siteConfig, services } from '../../lib/data';
import { addSubscriber } from '../../lib/firebase';
import Marquee from '../fx/Marquee';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  if (pathname?.startsWith('/admin')) return null;

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      await addSubscriber(email.trim().toLowerCase());
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink">
      <div className="glow-orb -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 bg-brand/15" />

      <Marquee className="border-b border-white/[0.06] py-5 mask-fade-x" innerClassName="gap-10">
        {[...services, ...services.slice(0, 2)].map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-semibold tracking-tight text-cream/30 sm:text-3xl">
            {s.title}
            <span className="h-2 w-2 rounded-full bg-brand" />
          </span>
        ))}
      </Marquee>

      <div className="container-x relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr,1fr,1fr,1.2fr]">
          <div className="space-y-6">
            <Link href="/" className="relative inline-block h-16 w-64 sm:h-20 sm:w-80" aria-label="GROOVINTO">
              <Image src="/logo/logo-full.png" alt="GROOVINTO. Guide. Gain. Grow." fill className="object-contain object-left" sizes="320px" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Premium content studio and digital growth partner. We build digital movements with AI content, storytelling and performance marketing.
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="pill hover:border-brand/50 hover:text-brand">
                  {s.label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="label">Navigate</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-cream/80 transition hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/register" className="text-sm text-mint transition hover:text-mint-300">
                  AI Video Course
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-cream/80 transition hover:text-brand">
                  <Mail className="h-4 w-4 text-muted" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-2 text-cream/80 transition hover:text-brand">
                  <Phone className="h-4 w-4 text-muted" /> {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cream/80 transition hover:text-mint">
                  <MessageCircle className="h-4 w-4 text-muted" /> WhatsApp
                </a>
              </li>
              <li className="pt-2 text-xs text-muted">
                {siteConfig.location}
                <br />
                {siteConfig.hours}
              </li>
            </ul>
          </div>

          <div>
            <p className="label">Newsletter</p>
            <p className="mb-4 text-sm text-muted">One email a month on AI content, growth and what is working right now.</p>
            {status === 'done' ? (
              <p className="text-sm text-mint">You are in. Talk soon.</p>
            ) : (
              <form onSubmit={subscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email"
                  className="input !rounded-full !py-3"
                />
                <button type="submit" disabled={status === 'sending'} className="btn-primary shrink-0 !px-5 !py-3 disabled:opacity-60">
                  {status === 'sending' ? '...' : 'Join'}
                </button>
              </form>
            )}
            {status === 'error' && <p className="mt-2 text-xs text-red-400">Could not subscribe. Try again.</p>}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GROOVINTO. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.25em]">Guide. Gain. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
