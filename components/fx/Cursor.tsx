'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'link' | 'label' | 'hidden';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>('hidden');
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });
  const visible = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add('has-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible.current) {
        visible.current = true;
        setState('default');
      }
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const labelled = target.closest<HTMLElement>('[data-cursor]');
      if (labelled) {
        setLabel(labelled.dataset.cursor || '');
        setState('label');
        return;
      }
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, label');
      setState(interactive ? 'link' : 'default');
      setLabel('');
    };
    const onLeave = () => {
      visible.current = false;
      setState('hidden');
    };
    const onEnter = () => {
      visible.current = true;
      setState('default');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="cursor-dot" data-state={state} style={{ x, y }} aria-hidden />
      <motion.div className="cursor-ring" data-state={state} style={{ x: ringX, y: ringY }} aria-hidden>
        {state === 'label' ? label : ''}
      </motion.div>
    </>
  );
}
