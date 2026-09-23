'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioItems, type PortfolioItem } from '../../lib/data';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import SectionHeading from '../layout/SectionHeading';
import Reveal from '../fx/Reveal';

function WorkCard({ item, className }: { item: PortfolioItem; className?: string }) {
  return (
    <Link
      href="/portfolio"
      data-cursor="View"
      className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-ink-2 ${className ?? ''}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 90vw, 46vw"
          className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105"
        />
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
    </Link>
  );
}

export default function WorkShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-62%']);
  const items = portfolioItems.slice(0, 4);

  return (
    <section id="work" className="relative">
      <div className="container-x pt-20 sm:pt-28 lg:pt-36">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Selected work" title="Stories that *moved the needle.*" />
          <Link href="/portfolio" className="btn-ghost self-start lg:self-auto">
            View all work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {isDesktop ? (
        <div ref={ref} className="relative h-[320vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex gap-6 pl-[max(1.25rem,calc((100vw-1320px)/2+3rem))]">
              {items.map((item) => (
                <WorkCard key={item.title} item={item} className="w-[46vw] max-w-[760px] shrink-0" />
              ))}
              <Link
                href="/portfolio"
                className="card flex w-[28vw] shrink-0 flex-col items-start justify-between p-10 transition hover:border-brand/40"
              >
                <p className="eyebrow">More</p>
                <div>
                  <h3 className="font-display text-4xl font-bold text-cream">See the full portfolio</h3>
                  <span className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ink">
                    <ArrowUpRight className="h-6 w-6" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="container-x mt-12 grid gap-6 pb-20">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <WorkCard item={item} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
