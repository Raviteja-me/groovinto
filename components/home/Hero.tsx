'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import TextReveal from '../fx/TextReveal';
import Magnetic from '../fx/Magnetic';
import SceneLoader from '../three/SceneLoader';
import { EASE } from '../../lib/utils';
import { COURSE } from '../../lib/course';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" />
      <div className="glow-orb -left-40 top-20 h-[520px] w-[520px] bg-brand/25" />
      <div className="glow-orb right-0 top-1/3 h-[420px] w-[420px] bg-mint/10" />

      <motion.div style={{ y: sceneY, scale: sceneScale }} className="pointer-events-none absolute inset-0 lg:left-[42%]">
        <SceneLoader variant="hero" className="h-full w-full opacity-60 lg:opacity-100" />
      </motion.div>

      <motion.div style={{ y, opacity }} className="container-x relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <Link href="/register" className="pill group hover:border-mint/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Now enrolling · {COURSE.name}
              <ArrowUpRight className="h-3.5 w-3.5 text-muted transition group-hover:text-mint" />
            </Link>
          </motion.div>

          <TextReveal
            as="h1"
            animateOnMount
            delay={0.35}
            text="We don't just market brands. We build *digital movements.*"
            className="mt-8 text-display-xl font-extrabold text-cream"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            AI content, branding and growth for bold brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link href="/contact" className="btn-primary">
                Start your brand journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/portfolio" className="btn-ghost">
                <Sparkles className="h-4 w-4 text-brand" />
                See our work
              </Link>
            </Magnetic>
          </motion.div>

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="relative h-10 w-6 rounded-full border border-white/20">
          <motion.span
            className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand"
            animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
