import Link from 'next/link';
import { navLinks } from '../lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-brand" />
            <div>
              <p className="text-lg font-semibold text-light">GROOVINTO</p>
              <p className="text-sm text-neutral">Guide. Gain. Grow.</p>
            </div>
          </div>
          <p className="max-w-sm text-neutral">
            Premium content studio and digital growth partner for brands ready to scale boldly.
          </p>
          <div className="flex gap-3">
            {['twitter', 'linkedin', 'instagram', 'dribbble'].map((social) => (
              <Link
                key={social}
                href={`https://${social}.com/groovinto`}
                className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wide text-neutral transition hover:border-white hover:text-light"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm text-neutral sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-light">Navigate</p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block hover:text-light">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-light">Contact</p>
            <a href="mailto:shenoy@groovinto.com" className="block hover:text-light">
              shenoy@groovinto.com
            </a>
            <a href="tel:+918722446168" className="block hover:text-light">
              +91 87224 46168
            </a>
            <a
              href="https://wa.me/918722446168"
              className="block rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-light shadow-glow hover:scale-105"
            >
              WhatsApp
            </a>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-light">Newsletter</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Work email"
                className="w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-light outline-none placeholder:text-neutral"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-brand px-3 py-2 text-xs font-semibold text-light shadow-glow transition hover:scale-105"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
