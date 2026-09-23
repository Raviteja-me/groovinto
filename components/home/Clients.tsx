import { clients } from '../../lib/data';
import Marquee from '../fx/Marquee';

export default function Clients() {
  return (
    <section className="border-y border-white/[0.06] py-10">
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Trusted by ambitious brands</p>
      <Marquee className="mask-fade-x" innerClassName="gap-14 px-7">
        {clients.map((c) => (
          <span key={c} className="flex items-center gap-14 whitespace-nowrap font-display text-2xl font-semibold text-cream/40 transition hover:text-cream sm:text-3xl">
            {c}
            <span className="h-1.5 w-1.5 rounded-full bg-mint/60" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
