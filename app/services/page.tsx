import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { services } from '../../lib/data';

export const metadata = {
  title: 'Services | GROOVINTO',
  description: 'AI content, storytelling, SEO, performance marketing, and product builds by GROOVINTO.'
};

export default function ServicesPage() {
  return (
    <div className="bg-midnight text-light">
      <Navbar />
      <main className="pt-28 section-padding">
        <div className="mx-auto max-w-5xl space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral">Services</p>
          <h1 className="text-4xl font-semibold">Built for speed and scale</h1>
          <p className="text-neutral">Cross-functional pods that plan, create, launch, and learn.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="glass glow-border rounded-2xl p-6 shadow-card-soft">
              <div className="text-2xl">{service.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-neutral">{service.description}</p>
              <button className="mt-4 text-sm font-semibold text-gradient">Book this service →</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
