'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 section-padding">
      <div className="absolute inset-0 bg-gradient-brand opacity-30 blur-3xl" />
      <div className="absolute inset-0 bg-grid-glow opacity-50" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-neutral">Guide. Gain. Grow.</p>
          <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl font-semibold text-light">
            We Don&apos;t Just Market Brands. <span className="text-gradient">We Build Digital Movements.</span>
          </h1>
          <p className="max-w-2xl text-lg text-neutral">
            AI Content. Branding. Digital Growth. GROOVINTO is the premium content studio and growth partner for
            category-defining brands.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="button-glow rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-105"
            >
              Start Your Brand Journey
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-light transition hover:border-white hover:scale-105"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {['AI Content Engine', 'Performance Marketing', 'Brand Systems', 'Full-Funnel Creative'].map((item) => (
            <Link
              key={item}
              href="/contact"
              className="glass glow-border relative overflow-hidden rounded-2xl p-6 shadow-card-soft transition hover:-translate-y-1"
            >
              <p className="text-sm font-semibold text-light">{item}</p>
              <p className="mt-2 text-sm text-neutral">Modular workflows that ship weekly.</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
