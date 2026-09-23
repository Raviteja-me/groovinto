'use client';

import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

function Eye({ irisRef }: { irisRef: (el: HTMLSpanElement | null) => void }) {
  return (
    <span className="relative mx-[0.015em] inline-block h-[0.8em] w-[0.8em] translate-y-[0.02em] overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#e9e9e9_55%,#bdbdbd)] shadow-[inset_-0.04em_-0.06em_0.1em_rgba(0,0,0,0.35)]">
      <span
        ref={irisRef}
        className="absolute left-1/2 top-1/2 h-[58%] w-[58%] rounded-full bg-[radial-gradient(circle_at_40%_38%,#2a1200_0_24%,#ff6a00_27%,#ff9f0d_62%,#b84c00_100%)] shadow-[0_0_0.04em_rgba(0,0,0,0.4)] will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <span className="pointer-events-none absolute inset-0 origin-top rounded-full bg-ink animate-blink" />
    </span>
  );
}

export default function Logo({ className, withTagline = false }: { className?: string; withTagline?: boolean }) {
  const irises = useRef<HTMLSpanElement[]>([]);
  const setIris = (el: HTMLSpanElement | null) => {
    if (el && !irises.current.includes(el)) irises.current.push(el);
  };

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    const update = () => {
      raf = 0;
      for (const iris of irises.current) {
        const eye = iris.parentElement;
        if (!eye) continue;
        const r = eye.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.min(1, Math.hypot(dx, dy) / 260);
        const angle = Math.atan2(dy, dx);
        const max = r.width * 0.2;
        const tx = Math.cos(angle) * dist * max;
        const ty = Math.sin(angle) * dist * max;
        iris.style.transform = `translate(calc(-50% + ${tx.toFixed(2)}px), calc(-50% + ${ty.toFixed(2)}px))`;
      }
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span className={cn('inline-flex flex-col items-start leading-none', className)}>
      <span className="inline-flex items-center font-display font-extrabold tracking-[-0.03em] text-brand">
        <span>GR</span>
        <Eye irisRef={setIris} />
        <Eye irisRef={setIris} />
        <span>VINTO</span>
      </span>
      {withTagline && <span className="mt-[0.35em] font-display text-[0.28em] font-bold tracking-wide text-mint">Guide. Gain. Grow.</span>}
    </span>
  );
}
