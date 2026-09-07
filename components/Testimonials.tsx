'use client';

import { motion } from 'framer-motion';
import { testimonials } from '../lib/data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral">Testimonials</p>
          <h2 className="text-3xl font-semibold text-light sm:text-4xl">Trusted by leaders</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.05 }}
              className="glass glow-border flex flex-col gap-4 rounded-2xl p-6 shadow-card-soft"
            >
              <p className="text-sm text-neutral">“{item.quote}”</p>
              <div className="text-sm font-semibold text-light">{item.name}</div>
              <div className="text-xs uppercase tracking-wide text-neutral">{item.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
