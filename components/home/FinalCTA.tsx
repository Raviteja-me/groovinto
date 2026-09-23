import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../lib/data';
import Marquee from '../fx/Marquee';
import Magnetic from '../fx/Magnetic';
import Reveal from '../fx/Reveal';
import TextReveal from '../fx/TextReveal';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="glow-orb left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-brand/20" />
      <Marquee className="absolute left-0 right-0 top-1/2 -translate-y-1/2 opacity-[0.07]" pauseOnHover={false} innerClassName="gap-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="whitespace-nowrap font-display text-[18vw] font-extrabold leading-none text-cream">
            LET&apos;S BUILD
          </span>
        ))}
      </Marquee>
      <div className="container-x relative text-center">
        <Reveal>
          <p className="eyebrow justify-center">Ready when you are</p>
        </Reveal>
        <TextReveal as="h2" text="Ready to grow *your brand?*" className="mx-auto mt-5 justify-center text-display-xl font-extrabold text-cream" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Tell us the goal. We will build the plan.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link href="/contact" className="btn-primary !px-9 !py-4 text-base">
              Start your project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost !px-9 !py-4 text-base">
              <MessageCircle className="h-4 w-4 text-mint" />
              WhatsApp us
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
