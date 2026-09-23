'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../brand/Logo';
import { EASE } from '../../lib/utils';

const MIN_MS = 1250; // long enough for the eyes to blink twice

/** Covers the screen with the blinking GROOVINTO eyes whenever an internal link is clicked. */
export default function PageTransition() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const startedAt = useRef(0);
  const target = useRef<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      target.current = url.pathname;
      startedAt.current = Date.now();
      setShow(true);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const wait = Math.max(0, MIN_MS - (Date.now() - startedAt.current));
    const reached = target.current === pathname;
    const t = setTimeout(() => setShow(false), reached ? wait : 4000); // 4s safety net
    return () => clearTimeout(t);
  }, [pathname, show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-transition"
          className="fixed inset-0 z-[8990] flex items-center justify-center bg-ink"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.5, ease: EASE } }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.7, ease: EASE } }}
        >
          <div className="glow-orb left-1/2 top-1/2 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 bg-brand/15" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.5, ease: EASE } }}>
            <Logo lids="double" className="text-[13vw] sm:text-[8vw] lg:text-[7rem]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
