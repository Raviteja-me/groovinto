'use client';

import { motion } from 'framer-motion';
import { services } from '../lib/data';

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral">Services</p>
          <h2 className="text-3xl font-semibold text-light sm:text-4xl">What we ship</h2>
          <p className="max-w-2xl text-neutral">
            Cross-functional pods built for modern growth: AI, creative, media, and product in one rhythm.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.05, duration: 0.45 }}
              className="glass glow-border group relative overflow-hidden rounded-2xl p-6 shadow-card-soft transition hover:-translate-y-2"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-2xl">{service.icon}</div>
                <div className="h-10 w-10 rounded-full bg-gradient-brand opacity-70 blur-sm transition group-hover:opacity-100" />
              </div>
              <h3 className="text-xl font-semibold text-light">{service.title}</h3>
              <p className="mt-3 text-sm text-neutral">{service.description}</p>
              <div className="mt-4 text-xs font-medium uppercase tracking-wide text-orange-400">
                {service.title.includes('AI') ? 'AI-POWERED' : 'PREMIUM SERVICE'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
