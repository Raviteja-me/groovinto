'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { serviceIcons } from '../../lib/icons';
import { services, type Service } from '../../lib/data';
import SectionHeading from '../layout/SectionHeading';
import { Stagger, StaggerItem } from '../fx/Reveal';
import TiltCard from '../fx/TiltCard';
import { cn } from '../../lib/utils';


const accentClasses: Record<Service['accent'], string> = {
  brand: 'text-brand bg-brand/10 border-brand/20 group-hover:shadow-glow-sm',
  mint: 'text-mint bg-mint/10 border-mint/20 group-hover:shadow-glow-mint',
  amber: 'text-amber bg-amber/10 border-amber/20 group-hover:shadow-glow-sm'
};

const spans = ['lg:col-span-7 lg:row-span-2', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];

function ServiceCard({ service, index, big = false }: { service: Service; index: number; big?: boolean }) {
  const Icon = serviceIcons[service.icon];
  return (
    <TiltCard intensity={6} className={cn('card card-hover group flex h-full flex-col p-7', big && 'p-8 sm:p-10')}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="flex items-start justify-between">
        <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl border transition duration-500', accentClasses[service.accent])}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-xs text-muted">0{index + 1}</span>
      </div>
      <h3 className={cn('mt-8 font-display font-bold tracking-tight text-cream', big ? 'text-3xl sm:text-4xl' : 'text-xl')}>{service.title}</h3>
      <p className={cn('mt-3 text-muted', big ? 'max-w-md text-base' : 'text-sm')}>{service.short}</p>
      <div className="mt-auto pt-8">
        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream/70 transition group-hover:text-brand">
          Explore
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </TiltCard>
  );
}

export default function ServicesBento() {
  const [first, ...rest] = services;
  const training = rest.pop() as Service;
  const TrainingIcon = serviceIcons[training.icon];

  return (
    <section id="services" className="section">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="What we do" title="Seven ways we make brands *move.*" />
          <Link href="/services" className="btn-ghost self-start lg:self-auto">
            All services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto,auto]" stagger={0.07}>
          <StaggerItem className={spans[0]}>
            <ServiceCard service={first} index={0} big />
          </StaggerItem>
          {rest.map((s, i) => (
            <StaggerItem key={s.slug} className={spans[i + 1]}>
              <ServiceCard service={s} index={i + 1} />
            </StaggerItem>
          ))}
          <StaggerItem className="lg:col-span-12">
            <Link
              href="/register"
              className="card group relative flex flex-col gap-6 overflow-hidden border-mint/20 bg-gradient-to-r from-mint/10 via-ink-2 to-brand/10 p-8 transition hover:border-mint/50 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <div className="glow-orb -right-20 -top-20 h-64 w-64 bg-mint/25" />
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-mint/20 bg-mint/10 text-mint">
                  <TrainingIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">07 · Academy</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-cream sm:text-3xl">{training.title}</h3>
                  <p className="mt-2 max-w-xl text-sm text-muted">{training.short}</p>
                </div>
              </div>
              <span className="btn-mint shrink-0">
                Join the AI Video Course
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
