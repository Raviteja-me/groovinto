'use client';

import { motion } from 'framer-motion';
import { portfolioItems } from '../lib/data';
import Image from 'next/image';
import { useState } from 'react';

const filters = ['All', 'Marketing campaigns', 'Video ads', 'Instagram reels', 'Brand shoots'];

export default function Portfolio() {
  const filtered = portfolioItems;

  return (
    <section id="portfolio" className="section-padding">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral">Portfolio</p>
          <h2 className="text-3xl font-semibold text-light sm:text-4xl">Signature work</h2>
          <p className="max-w-xl text-neutral">Where creative storytelling meets performance outcomes.</p>
        </div>
        <div className="glass glow-border overflow-hidden rounded-3xl shadow-card-soft">
          <div className="relative h-[320px] w-full bg-black">
            <video
              className="h-full w-full object-cover"
              src="https://cdn.coverr.co/videos/coverr-teamwork-in-the-office-9865/1080p.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 space-y-1 rounded-lg bg-black/40 px-4 py-2 text-sm text-light backdrop-blur">
              <div className="font-semibold">Highlight Reel</div>
              <div className="text-neutral">Campaign snippets, motion graphics, AI visuals</div>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.05 }}
              className="glass glow-border overflow-hidden rounded-2xl shadow-card-soft"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-neutral">
                  <span>{item.category}</span>
                  <span className="text-gradient font-semibold">View Case</span>
                </div>
                <h3 className="text-xl font-semibold text-light">{item.title}</h3>
                <p className="text-sm text-neutral">{item.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-neutral"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
