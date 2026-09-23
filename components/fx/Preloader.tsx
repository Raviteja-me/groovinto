'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/utils';

const KEY = 'grv-intro-seen';
const LETTERS = 'GROOVINTO'.split('');

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {
      seen = true;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced) {
      setReady(true);
      return;
    }
    setShow(true);
    window.__lenis?.stop();
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {}
      window.__lenis?.start();
      setReady(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  if (ready && !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: EASE } }}
        >
          <div className="relative flex flex-col items-center">
            <div className="flex overflow-hidden font-display text-[12vw] font-extrabold leading-none tracking-tight text-brand sm:text-7xl">
              {LETTERS.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.045 }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-mint"
            >
              Guide. Gain. Grow.
            </motion.p>
            <motion.div
              className="mt-8 h-px w-40 origin-left bg-gradient-brand"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
