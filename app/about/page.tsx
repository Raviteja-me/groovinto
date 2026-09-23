import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import SectionHeading from '../../components/layout/SectionHeading';
import Reveal, { Stagger, StaggerItem } from '../../components/fx/Reveal';
import TiltCard from '../../components/fx/TiltCard';
import Stats from '../../components/home/Stats';
import Process from '../../components/home/Process';
import FinalCTA from '../../components/home/FinalCTA';
import { milestones, siteConfig, values } from '../../lib/data';

export const metadata: Metadata = {
  title: 'About',
  description: 'GROOVINTO is a premium content studio and digital growth partner founded by Aamith Shenoy. We scale brands with AI content, storytelling and performance.'
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About GROOVINTO"
        title="A studio built to make brands *move.*"
        description="We are a creative and growth company from Bengaluru. AI-first production, brand systems and performance media, all under one roof, all pointed at one thing: momentum for your brand."
      />

      <section className="section pt-0">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr,1fr] lg:gap-24">
          <SectionHeading eyebrow="Our mission" title="Make brands move faster than the *internet.*" />
          <Reveal delay={0.1} className="space-y-6 text-lg text-muted lg:pt-16">
            <p>
              Attention moves in hours now. Most brands still plan in quarters. GROOVINTO exists to close that gap: we unite storytelling, AI and measurable growth so
              your brand can show up every day with work that is worth watching.
            </p>
            <p>
              We are not an agency that hands you a deck. We are a studio that ships. Films, reels, campaigns, positioning and performance, delivered in weekly cycles by
              a team that treats your numbers like our own.
            </p>
          </Reveal>
        </div>
      </section>

      <Stats />

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="What we believe" title="Four rules we *never break.*" align="center" />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <TiltCard intensity={6} className="card card-hover flex h-full flex-col p-7">
                  <span className="font-mono text-xs text-brand">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-xl font-bold text-cream">{v.title}</h3>
                  <p className="mt-3 text-sm text-muted">{v.description}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr,1.1fr] lg:gap-24">
          <Reveal>
            <TiltCard className="card p-8 sm:p-10">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/30 blur-3xl" />
              <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-brand font-display text-2xl font-extrabold text-ink">AS</span>
              <p className="eyebrow mt-8">Founder</p>
              <h3 className="mt-3 font-display text-3xl font-bold text-cream">{siteConfig.founder}</h3>
              <p className="mt-1 text-sm text-brand">Creative technologist & growth strategist</p>
              <p className="mt-6 text-sm leading-relaxed text-cream/80">
                Aamith has led campaigns for fintech, SaaS and consumer brands across India and APAC. He started GROOVINTO to prove that creative craft and performance
                rigour belong in the same room, and that AI makes both faster.
              </p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Talk to Aamith <ArrowRight className="h-4 w-4" />
              </Link>
            </TiltCard>
          </Reveal>
          <div>
            <SectionHeading eyebrow="The journey" title="From a laptop to an *AI-native studio.*" />
            <ol className="relative mt-10 space-y-8 border-l border-white/10 pl-8">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.06}>
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-brand shadow-glow-sm" />
                    <p className="font-mono text-xs text-brand">{m.year}</p>
                    <h4 className="mt-1 font-display text-xl font-bold text-cream">{m.title}</h4>
                    <p className="mt-1 text-sm text-muted">{m.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </main>
  );
}
