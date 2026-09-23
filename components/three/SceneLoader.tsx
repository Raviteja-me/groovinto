'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { SceneVariant } from './Scene';

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null
});

export default function SceneLoader({ variant = 'hero', className }: { variant?: SceneVariant; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '200px 0px' });

  return (
    <div ref={ref} className={cn('relative', className)} aria-hidden>
      <div className="glow-orb left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 bg-brand/30" />
      <Scene variant={variant} active={inView} className="!absolute inset-0" />
    </div>
  );
}
