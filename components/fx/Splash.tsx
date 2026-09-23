'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../brand/Logo';
import { EASE } from '../../lib/utils';

/** On every full page load: the GROOVINTO eyes blink twice, then the page is revealed. */
export default function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('skip-intro')) {
      setShow(false);
      return;
    }
    window.__lenis?.stop();
    const t = setTimeout(() => {
      setShow(false);
      window.__lenis?.start();
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9000] flex items-center justify-center overflow-hidden bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: EASE } }}
        >
          <div className="glow-orb left-1/2 top-1/2 h-[50vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-brand/15" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <Logo lids="double" withTagline className="text-[15vw] sm:text-[11vw] lg:text-[9.5rem]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
