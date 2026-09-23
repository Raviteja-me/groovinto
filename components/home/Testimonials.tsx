import { Quote } from 'lucide-react';
import { testimonials } from '../../lib/data';
import SectionHeading from '../layout/SectionHeading';
import { Stagger, StaggerItem } from '../fx/Reveal';
import TiltCard from '../fx/TiltCard';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="Trusted by *founders and leaders.*" align="center" />
        <Stagger className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible" stagger={0.1}>
          {testimonials.map((t, i) => (
            <StaggerItem key={t.name} className="w-[85vw] shrink-0 snap-center sm:w-[70vw] md:w-auto">
              <TiltCard intensity={5} className="card flex h-full flex-col p-8">
                <Quote className={`h-8 w-8 ${i === 1 ? 'text-mint' : 'text-brand'}`} />
                <p className="mt-6 flex-1 font-display text-xl font-medium leading-relaxed text-cream/90">“{t.quote}”</p>
                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-ink">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cream">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
