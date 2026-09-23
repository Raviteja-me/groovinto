'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { portfolioFilters, portfolioItems, type PortfolioItem } from '../../lib/data';
import { EASE, cn } from '../../lib/utils';

export default function WorkGrid() {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]>('All');
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const items = filter === 'All' ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  useEffect(() => {
    if (active) window.__lenis?.stop();
    else window.__lenis?.start();
    document.body.style.overflow = active ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-x">
        <div className="flex flex-wrap gap-2">
          {portfolioFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                filter === f ? 'border-brand bg-brand text-ink shadow-glow-sm' : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/30 hover:text-cream'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                layout
                key={item.title}
                onClick={() => setActive(item)}
                data-cursor="View"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
                className={cn('group relative block overflow-hidden rounded-3xl border border-white/10 bg-ink-2 text-left', i % 3 === 0 && 'md:col-span-2')}
              >
                <div className={cn('relative w-full overflow-hidden', i % 3 === 0 ? 'aspect-[16/8]' : 'aspect-[16/10]')}>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand">{item.category}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-cream sm:text-3xl">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.result}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-cream backdrop-blur transition group-hover:bg-brand group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/80 p-3 backdrop-blur-md sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="card grid w-full max-w-4xl overflow-hidden lg:grid-cols-[1.2fr,1fr]"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <Image src={active.image} alt={active.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              </div>
              <div className="flex flex-col p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand">{active.category}</p>
                    <h3 className="mt-2 font-display text-3xl font-bold text-cream">{active.title}</h3>
                    <p className="mt-1 text-sm text-muted">{active.client}</p>
                  </div>
                  <button onClick={() => setActive(null)} aria-label="Close" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted hover:text-cream">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-cream/85">{active.summary}</p>
                <div className="mt-6 rounded-2xl border border-mint/20 bg-mint/10 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint">Result</p>
                  <p className="mt-1 font-display text-2xl font-bold text-cream">{active.result}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="btn-primary mt-auto pt-3.5">
                  Start a similar project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
