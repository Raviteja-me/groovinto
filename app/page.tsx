import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import FinalCTA from '../components/FinalCTA';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Cursor from '../components/Cursor';
import ClientLogos from '../components/ClientLogos';
import dynamic from 'next/dynamic';

const CheckoutButton = dynamic(() => import('../components/CheckoutButton'), { ssr: false });

export default function HomePage() {
  return (
    <div className="relative">
      <Navbar />
      <Cursor />
      <main className="pt-16">
        <Hero />
        <AboutSection />
        <Services />
        <ClientLogos />
        <Testimonials />
        <FinalCTA />
        <div className="flex justify-center mt-6">
          <CheckoutButton />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
