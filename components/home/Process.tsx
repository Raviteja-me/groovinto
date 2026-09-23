'use client';

import { motion } from 'framer-motion';
import { process } from '../../lib/data';
import SectionHeading from '../layout/SectionHeading';
import { EASE } from '../../lib/utils';

export default function Process() {
  return (
    <section className="section overflow-hidden">
      <div className="glow-orb left-[-10%] bottom-0 h-[460px] w-[460px] bg-mint/10" />
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr,1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="How we work"
            title="Guide. Gain. *Grow.*"
            description="Three words on the logo, three phases in every engagement. A simple system that turns attention into revenue."
          />
        </div>
        <ol className="relative space-y-6">
          <span className="absolute left-[27px] top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-brand via-amber to-mint sm:block" />
          {process.map((p, i) => (
            <motion.li
              key={p.step}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="card card-hover group relative flex gap-6 p-7 sm:p-9"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink font-mono text-sm text-brand transition group-hover:border-brand group-hover:shadow-glow-sm">
                {p.step}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-3xl font-bold text-cream sm:text-4xl">{p.title}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{p.subtitle}</span>
                </div>
                <p className="mt-4 max-w-lg text-muted">{p.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
