import { stats } from '../../lib/data';
import Counter from '../fx/Counter';
import { Stagger, StaggerItem } from '../fx/Reveal';

export default function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-ink-2/60">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 divide-white/[0.06] lg:grid-cols-4 lg:divide-x" stagger={0.1}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className="py-12 text-center lg:py-16">
              <p className="font-display text-5xl font-extrabold tracking-tight text-cream sm:text-6xl">
                <Counter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} className="gradient-text" />
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
