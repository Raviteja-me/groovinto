import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral">About</p>
          <h2 className="text-3xl font-semibold text-light sm:text-4xl">
            Premium content studio and digital growth partner.
          </h2>
          <p className="text-neutral">
            GROOVINTO helps ambitious brands scale with storytelling, AI-powered content, brand systems, and
            performance marketing. Founded by Aamith Shenoy, we blend creative craft with technical rigor to ship
            work that compounds.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-neutral">
            {['AI-first creative ops', 'Performance with brand love', 'Ship weekly', 'Measurement built-in'].map(
              (item) => (
                <span key={item} className="rounded-full bg-white/5 px-3 py-1">
                  {item}
                </span>
              )
            )}
          </div>
          <Link href="/about" className="text-sm font-semibold text-gradient">
            More about GROOVINTO →
          </Link>
        </div>
        <div className="glass glow-border space-y-4 rounded-2xl p-6 shadow-card-soft">
          <h3 className="text-xl font-semibold text-light">Founder</h3>
          <p className="text-neutral">Aamith Shenoy — Creative technologist & growth strategist.</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-neutral">
            <div>
              <p className="text-light">Story</p>
              <p>Built campaigns across fintech, SaaS, and consumer brands.</p>
            </div>
            <div>
              <p className="text-light">Focus</p>
              <p>AI content systems, revenue design, brand platforms.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
