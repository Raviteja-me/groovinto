import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'About | GROOVINTO',
  description:
    'GROOVINTO is a premium content studio and digital growth partner founded by Aamith Shenoy. We scale brands with AI content, storytelling, and performance.'
};

export default function AboutPage() {
  return (
    <div className="bg-midnight text-light">
      <Navbar />
      <main className="pt-28">
        <section className="section-padding">
          <div className="mx-auto max-w-5xl space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral">About</p>
            <h1 className="text-4xl font-semibold">Who we are</h1>
            <p className="text-neutral">
              GROOVINTO is a modern creative and growth company. We combine AI-first content production, brand
              systems, and performance media to build digital movements for our clients.
            </p>
          </div>
        </section>
        <section className="section-padding">
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
            <div className="glass glow-border rounded-2xl p-6 shadow-card-soft">
              <h2 className="text-2xl font-semibold">Mission</h2>
              <p className="mt-3 text-neutral">
                To make brands move faster than the internet by uniting storytelling, AI, and measurable growth.
              </p>
              <ul className="mt-4 space-y-2 text-neutral">
                <li>• AI-native production pipelines.</li>
                <li>• Brand systems that scale across channels.</li>
                <li>• Performance marketing with creative science.</li>
              </ul>
            </div>
            <div className="glass glow-border rounded-2xl p-6 shadow-card-soft">
              <h2 className="text-2xl font-semibold">Founder</h2>
              <p className="mt-3 text-neutral">
                Aamith Shenoy is a creative technologist and growth strategist who has led campaigns for fintech,
                SaaS, and consumer brands across APAC.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral">
                <div>
                  <p className="text-light">Focus</p>
                  <p>AI content, revenue design, community.</p>
                </div>
                <div>
                  <p className="text-light">Location</p>
                  <p>Remote-first, global teams.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
