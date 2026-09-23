'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Calendar, Clock, Globe, Users } from 'lucide-react';
import { COURSE } from '../../lib/course';
import { EASE, formatINR } from '../../lib/utils';
import TextReveal from '../fx/TextReveal';
import Magnetic from '../fx/Magnetic';
import SceneLoader from '../three/SceneLoader';

const facts = [
  { icon: Clock, label: 'Duration', value: COURSE.duration },
  { icon: Calendar, label: 'Format', value: COURSE.sessions },
  { icon: Users, label: 'Level', value: COURSE.level },
  { icon: Globe, label: 'Language', value: COURSE.language }
];

export default function CourseHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-20">
      <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" />
      <div className="glow-orb -left-32 top-32 h-[460px] w-[460px] bg-mint/15" />
      <div className="pointer-events-none absolute inset-0 hidden lg:left-[52%] lg:block">
        <SceneLoader variant="course" className="h-full w-full" />
      </div>

      <div className="container-x relative">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }} className="flex flex-wrap gap-2">
            <span className="pill border-mint/30 text-mint">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" /> {COURSE.format}
            </span>
            <span className="pill">{COURSE.nextCohort}</span>
            <span className="pill">{COURSE.seats} seats only</span>
          </motion.div>

          <TextReveal as="h1" animateOnMount delay={0.3} text="Make *AI videos* people watch." className="mt-8 text-display-lg font-extrabold text-cream" accentClassName="mint-text" />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.9 }} className="mt-6 max-w-xl text-lg text-muted">
            {COURSE.subheadline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 1.05 }} className="mt-10 flex flex-wrap items-center gap-5">
            <Magnetic>
              <a href="#register" className="btn-primary !px-8 !py-4 text-base">
                Register for {formatINR(COURSE.price)}
                <ArrowDown className="h-4 w-4" />
              </a>
            </Magnetic>
            <div className="text-sm text-muted">
              <s>{formatINR(COURSE.originalPrice)}</s> · Launch pricing
            </div>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {facts.map((f) => (
              <li key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                <f.icon className="h-4 w-4 text-brand" />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{f.label}</p>
                <p className="mt-1 text-sm font-medium text-cream">{f.value}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
