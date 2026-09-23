'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Logo from '../brand/Logo';
import { EASE } from '../../lib/utils';

const KEY = 'grv-splash-seen';
type Mode = 'cover' | 'splash' | 'loader' | 'done';

/**
 * First visit in a session: big GROOVINTO eyes + a "Continue" button that chases the cursor.
 * Any later full page load: the eyes blink twice and the page is revealed.
 */
export default function Splash() {
  const [mode, setMode] = useState<Mode>('cover');
  const [ready, setReady] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 14, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 14, mass: 0.6 });

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {}
    if (new URLSearchParams(window.location.search).has('skip-intro')) {
      setMode('done');
      return;
    }
    window.__lenis?.stop();
    if (seen) {
      setMode('loader');
      const t = setTimeout(() => finish(false), 1300);
      return () => clearTimeout(t);
    }
    setMode('splash');
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continue button follows the cursor, staying within a radius of its home spot.
  useEffect(() => {
    if (mode !== 'splash' || !ready) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e: MouseEvent) => {
      const el = btnRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const homeX = r.left + r.width / 2 - x.get();
      const homeY = r.top + r.height / 2 - y.get();
      let dx = e.clientX - homeX;
      let dy = e.clientY - homeY;
      const dist = Math.hypot(dx, dy);
      const max = Math.min(260, window.innerWidth * 0.3);
      if (dist > max) {
        dx = (dx / dist) * max;
        dy = (dy / dist) * max;
      }
      x.set(dx);
      y.set(dy);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mode, ready, x, y]);

  function finish(markSeen = true) {
    if (markSeen) {
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {}
    }
    setMode('done');
    window.__lenis?.start();
  }

  return (
    <AnimatePresence>
      {mode !== 'done' && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-hidden bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: EASE } }}
          onClick={() => mode === 'splash' && ready && finish()}
        >
          <div className="glow-orb left-1/2 top-1/2 h-[50vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-brand/15" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <Logo lids="double" withTagline={mode !== 'loader'} className="text-[15vw] sm:text-[11vw] lg:text-[9.5rem]" />
          </motion.div>

          {mode === 'splash' && (
            <AnimatePresence>
              {ready && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="relative mt-14 sm:mt-20"
                >
                  <motion.div ref={btnRef} style={{ x: sx, y: sy }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        finish();
                      }}
                      className="group relative flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full bg-brand text-sm font-semibold text-ink shadow-glow transition-transform duration-300 hover:scale-110 sm:h-36 sm:w-36"
                    >
                      <span className="absolute inset-0 rounded-full border border-brand animate-pulse-ring" />
                      Continue
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
