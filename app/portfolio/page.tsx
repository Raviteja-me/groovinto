import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Portfolio from '../../components/Portfolio';

export const metadata = {
  title: 'Portfolio | GROOVINTO',
  description: 'Selected case studies and creative work from GROOVINTO.'
};

export default function PortfolioPage() {
  return (
    <div className="bg-midnight text-light">
      <Navbar />
      <main className="pt-24">
        <div className="section-padding">
          <div className="mx-auto max-w-5xl space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral">Work</p>
            <h1 className="text-4xl font-semibold">Portfolio</h1>
            <p className="text-neutral">
              Campaigns, brand systems, video, and growth programs that moved the needle.
            </p>
          </div>
        </div>
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
