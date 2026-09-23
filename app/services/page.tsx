import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Reveal from '../../components/fx/Reveal';
import { serviceIcons } from '../../lib/icons';
import Process from '../../components/home/Process';
import FinalCTA from '../../components/home/FinalCTA';
import { services } from '../../lib/data';
import { cn } from '../../lib/utils';

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI content production, brand films, positioning, digital advertising, performance marketing and creator training by GROOVINTO.'
};

const accent = {
  brand: 'text-brand bg-brand/10 border-brand/20',
  mint: 'text-mint bg-mint/10 border-mint/20',
  amber: 'text-amber bg-amber/10 border-amber/20'
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Services"
        title="Everything a brand needs to *move.*"
        description="Cross-functional pods that plan, create, launch and learn. Pick one service or run the whole engine."
      >
        <Link href="/contact" className="btn-primary">
          Start a project <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      <section className="pb-24 sm:pb-32">
        <div className="container-x divide-y divide-white/[0.08] border-t border-white/[0.08]">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            const isCourse = s.slug === 'ai-creator-training';
            return (
              <Reveal key={s.slug} amount={0.15}>
                <article className="group grid gap-8 py-12 lg:grid-cols-[80px,1fr,1fr] lg:gap-14 lg:py-16">
                  <div className="flex items-start gap-5 lg:block">
                    <span className="font-mono text-sm text-muted">0{i + 1}</span>
                    <span className={cn('mt-0 flex h-12 w-12 items-center justify-center rounded-2xl border lg:mt-6', accent[s.accent])}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-cream transition group-hover:text-brand sm:text-4xl">{s.title}</h2>
                    <p className="mt-4 max-w-lg text-muted">{s.description}</p>
                    <Link href={isCourse ? '/register' : '/contact'} className={cn('mt-6 inline-flex items-center gap-2 text-sm font-semibold', isCourse ? 'text-mint' : 'text-brand')}>
                      {isCourse ? 'Join the AI Video Course' : 'Start this service'}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  <div>
                    <p className="label">Deliverables</p>
                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-cream/85">
                          <span className={cn('h-1.5 w-1.5 rounded-full', s.accent === 'mint' ? 'bg-mint' : s.accent === 'amber' ? 'bg-amber' : 'bg-brand')} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Process />
      <FinalCTA />
    </main>
  );
}
