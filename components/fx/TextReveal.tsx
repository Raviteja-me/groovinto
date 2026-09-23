'use client';

import { motion } from 'framer-motion';
import { EASE, cn } from '../../lib/utils';

type Props = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  animateOnMount?: boolean;
};

/**
 * Splits text into words and reveals them from below, one by one.
 * Wrap words in *asterisks* to render them with the accent style.
 */
export default function TextReveal({
  text,
  as = 'h2',
  className,
  accentClassName = 'gradient-text',
  delay = 0,
  stagger = 0.045,
  once = true,
  animateOnMount = false
}: Props) {
  const Tag = motion[as] as typeof motion.h2;
  const segments = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  const words: { word: string; accent: boolean }[] = [];
  for (const seg of segments) {
    const accent = seg.startsWith('*') && seg.endsWith('*');
    const clean = accent ? seg.slice(1, -1) : seg;
    for (const w of clean.replace(/\n/g, ' \n ').split(' ')) {
      if (w.length) words.push({ word: w, accent });
    }
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } }
  };
  const child = {
    hidden: { y: '110%', rotate: 3, opacity: 0 },
    show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } }
  };

  return (
    <Tag
      className={cn('flex flex-wrap', className)}
      variants={container}
      initial="hidden"
      {...(animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once, amount: 0.4 } })}
      aria-label={text.replace(/\*/g, '').replace(/\n/g, ' ')}
    >
      {words.map((w, i) =>
        w.word === '\n' ? (
          <span key={i} className="basis-full" aria-hidden />
        ) : (
        <span key={i} className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span className={cn('inline-block origin-bottom-left', w.accent && accentClassName)} variants={child}>
            {w.word}
          </motion.span>
        </span>
        )
      )}
    </Tag>
  );
}
