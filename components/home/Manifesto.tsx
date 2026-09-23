'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../fx/Reveal';
import TiltCard from '../fx/TiltCard';
import { siteConfig } from '../../lib/data';

const TEXT =
  'A content studio and growth partner. AI-first production, bold stories, measurable growth.';

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(progress, range, ['#4a4a55', '#f4f1ea']);
  return (
    <motion.span style={{ opacity, color }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = TEXT.split(' ');

  return (
    <section id="about" className="section">
      <div className="glow-orb right-[-10%] top-0 h-[420px] w-[420px] bg-brand/10" />
      <div className="container-x grid gap-14 lg:grid-cols-[1fr,0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">About the studio</p>
          </Reveal>
          <p ref={ref} className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.9rem)] font-semibold leading-[1.2] tracking-tight">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1) / words.length + 0.05)]}>
                {w}
              </Word>
            ))}
          </p>
          <Reveal delay={0.2} className="mt-8">
            <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-semibold text-brand">
              More about GROOVINTO
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:pt-10">
          <TiltCard className="card p-8 sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/30 blur-3xl" />
            <p className="eyebrow">Founder</p>
            <h3 className="mt-4 font-display text-3xl font-bold text-cream">{siteConfig.founder}</h3>
            <p className="mt-1 text-sm text-muted">Creative technologist & growth strategist</p>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
