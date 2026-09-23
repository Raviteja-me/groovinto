import Marquee from '../fx/Marquee';

const items = ['AI Content Production', 'Brand Films', 'Performance Marketing', 'Creator Training', 'Positioning', 'Digital Ads', 'Micro-dramas', 'Reels & Shorts'];

export default function Ticker() {
  return (
    <div className="relative -rotate-1 border-y border-brand/30 bg-brand py-3 text-ink">
      <Marquee fast pauseOnHover={false} innerClassName="gap-8">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-lg font-bold uppercase tracking-tight sm:text-xl">
            {t}
            <span className="text-2xl leading-none">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
