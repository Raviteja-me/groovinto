'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, BookOpen, Briefcase, Check, ChevronDown, Layers, Users, Video } from 'lucide-react';
import { COURSE } from '../../lib/course';
import { EASE, cn } from '../../lib/utils';
import Reveal, { Stagger, StaggerItem } from '../fx/Reveal';
import TextReveal from '../fx/TextReveal';

const includeIcons = [Video, Layers, Briefcase, Users, Award, BookOpen];

export function Audience() {
  return (
    <div>
      <Reveal>
        <p className="eyebrow">Who it is for</p>
      </Reveal>
      <TextReveal as="h2" text="Built for creators, founders and *career switchers.*" className="mt-4 text-display-sm font-bold text-cream" />
      <Stagger className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.06}>
        {COURSE.audience.map((a) => (
          <StaggerItem key={a} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-cream/85">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
              <Check className="h-3 w-3" />
            </span>
            {a}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function Curriculum() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <Reveal>
        <p className="eyebrow">Curriculum</p>
      </Reveal>
      <TextReveal as="h2" text="Four weeks. *Real projects.* No fluff." className="mt-4 text-display-sm font-bold text-cream" />
      <div className="mt-8 space-y-3">
        {COURSE.modules.map((m, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={m.title} delay={i * 0.05}>
              <div className={cn('card transition-colors', isOpen && 'border-brand/30')}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center gap-5 p-5 text-left sm:p-6" aria-expanded={isOpen}>
                  <span className="font-mono text-xs text-brand">{m.week}</span>
                  <span className="flex-1 font-display text-lg font-bold text-cream sm:text-xl">{m.title}</span>
                  <ChevronDown className={cn('h-5 w-5 text-muted transition-transform duration-500', isOpen && 'rotate-180 text-brand')} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-2 border-t border-white/10 px-5 py-5 sm:grid-cols-2 sm:px-6">
                        {m.topics.map((t) => (
                          <li key={t} className="flex items-start gap-2 text-sm text-cream/80">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export function Includes() {
  return (
    <div>
      <Reveal>
        <p className="eyebrow">What you get</p>
      </Reveal>
      <TextReveal as="h2" text="Everything you need to *start shipping.*" className="mt-4 text-display-sm font-bold text-cream" accentClassName="mint-text" />
      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.06}>
        {COURSE.includes.map((inc, i) => {
          const Icon = includeIcons[i % includeIcons.length];
          return (
            <StaggerItem key={inc.title} className="card card-hover p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/10 text-mint">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-cream">{inc.title}</h3>
              <p className="mt-1 text-sm text-muted">{inc.text}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}

export function Instructor() {
  const { instructor } = COURSE;
  return (
    <Reveal>
      <div className="card flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand/25 blur-3xl" />
        <span className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-brand font-display text-2xl font-extrabold text-ink">
          {instructor.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </span>
        <div className="relative">
          <p className="eyebrow">Your instructor</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-cream">{instructor.name}</h3>
          <p className="text-sm text-brand">{instructor.role}</p>
          <p className="mt-3 text-sm text-muted">{instructor.bio}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <Reveal>
        <p className="eyebrow">FAQ</p>
      </Reveal>
      <TextReveal as="h2" text="Questions, *answered.*" className="mt-4 text-display-sm font-bold text-cream" />
      <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {COURSE.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left" aria-expanded={isOpen}>
                <span className={cn('font-display text-base font-semibold sm:text-lg', isOpen ? 'text-brand' : 'text-cream')}>{f.q}</span>
                <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition', isOpen && 'rotate-45 border-brand text-brand')}>
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
                    <p className="pb-5 pr-12 text-sm leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
