'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '../../lib/data';
import { EASE, cn } from '../../lib/utils';
import Logo from '../brand/Logo';
import Magnetic from '../fx/Magnetic';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const clicks = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout>>();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24);
    const goingDown = y > lastY.current && y > 160;
    setHidden(goingDown && !open);
    lastY.current = y;
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Hidden admin shortcut: click the logo three times quickly.
  const onLogoClick = (e: React.MouseEvent) => {
    clicks.current += 1;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => (clicks.current = 0), 700);
    if (clicks.current >= 3) {
      e.preventDefault();
      clicks.current = 0;
      router.push('/admin');
    }
  };

  const isAdmin = pathname?.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="container-x pt-4 sm:pt-5">
          <nav
            className={cn(
              'flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5',
              scrolled || open
                ? 'border-white/10 bg-ink/70 shadow-card backdrop-blur-xl'
                : 'border-transparent bg-transparent'
            )}
          >
            <Link href="/" onClick={onLogoClick} aria-label="GROOVINTO home" className="flex items-center">
              <Logo className="text-[22px] sm:text-[26px]" />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                const isCourse = link.href === '/register';
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'group relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                        active ? 'text-cream' : 'text-muted hover:text-cream',
                        isCourse && 'text-mint hover:text-mint-300'
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          'absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100',
                          active && 'scale-x-100'
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Magnetic strength={0.25} className="hidden lg:inline-block">
                <Link href="/contact" className="btn-primary !px-5 !py-2.5 text-[13px]">
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cream transition hover:bg-white/10 lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="glow-orb -right-20 top-10 h-72 w-72 bg-brand/30" />
            <div className="glow-orb -left-20 bottom-10 h-72 w-72 bg-mint/20" />
            <div className="container-x flex flex-1 flex-col justify-center pt-24">
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center justify-between border-b border-white/10 py-4 font-display text-4xl font-bold tracking-tight',
                        pathname === link.href ? 'text-brand' : link.href === '/register' ? 'text-mint' : 'text-cream'
                      )}
                    >
                      {link.label}
                      <ArrowUpRight className="h-6 w-6 text-muted" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
                className="mt-10 flex flex-col gap-3"
              >
                <Link href="/contact" className="btn-primary w-full">
                  Start a project
                </Link>
                <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost w-full">
                  WhatsApp us
                </a>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                  {siteConfig.email} · {siteConfig.phone}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
