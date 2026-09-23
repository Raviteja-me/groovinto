import Link from 'next/link';
import { ArrowRight, Check, Video } from 'lucide-react';
import { COURSE } from '../../lib/course';
import { formatINR } from '../../lib/utils';
import Reveal from '../fx/Reveal';
import TextReveal from '../fx/TextReveal';
import TiltCard from '../fx/TiltCard';

export default function CoursePromo() {
  return (
    <section className="section overflow-hidden">
      <div className="glow-orb right-[-10%] top-10 h-[520px] w-[520px] bg-mint/15" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">GROOVINTO Academy</p>
          </Reveal>
          <TextReveal as="h2" text="Learn to make *AI videos* that people actually watch." className="mt-4 text-display-md font-bold text-cream" accentClassName="mint-text" />
          <Reveal delay={0.25}>
            <ul className="mt-8 space-y-3">
              {['8 live sessions with the studio team', 'Prompt and workflow library you can reuse', '3 portfolio-ready projects', 'Private cohort community and certificate'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-cream/85">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint/15 text-mint">
                    <Check className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center gap-5">
            <Link href="/register" className="btn-mint">
              Register for {formatINR(COURSE.price)}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm text-muted">
              <s className="mr-2">{formatINR(COURSE.originalPrice)}</s>
              Launch pricing · {COURSE.seats} seats
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <TiltCard intensity={8} className="relative">
            <div className="card overflow-hidden border-mint/20 p-8 sm:p-10">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mint/25 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="pill border-mint/30 text-mint">
                    <Video className="h-3.5 w-3.5" /> {COURSE.format}
                  </span>
                  <span className="font-mono text-xs text-muted">{COURSE.nextCohort}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl font-bold text-cream sm:text-4xl">{COURSE.name}</h3>
                <p className="mt-2 text-sm text-muted">
                  {COURSE.duration} · {COURSE.sessions}
                </p>
                <div className="mt-8 flex items-end gap-3">
                  <span className="font-display text-6xl font-extrabold tracking-tight text-cream">{formatINR(COURSE.price)}</span>
                  <span className="mb-2 text-muted line-through">{formatINR(COURSE.originalPrice)}</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
                  {[
                    ['Level', COURSE.level],
                    ['Language', COURSE.language],
                    ['Instructor', COURSE.instructor.name],
                    ['Seats', `${COURSE.seats} per cohort`]
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="font-mono uppercase tracking-[0.2em] text-muted">{k}</p>
                      <p className="mt-1 text-cream/90">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
