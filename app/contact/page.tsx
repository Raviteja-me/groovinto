import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact | GROOVINTO',
  description: 'Start a project with GROOVINTO. AI content, branding, and digital growth.'
};

export default function ContactPage() {
  return (
    <div className="bg-midnight text-light">
      <Navbar />
      <main className="pt-24 section-padding">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral">Contact</p>
            <h1 className="text-4xl font-semibold">Let&apos;s build the next movement</h1>
            <p className="text-neutral">Tell us about your brand, goals, and timelines.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass glow-border rounded-2xl p-6 shadow-card-soft md:col-span-2">
              <ContactForm />
            </div>
            <div className="glass glow-border rounded-2xl p-6 shadow-card-soft space-y-4">
              <h3 className="text-xl font-semibold">Contact Info</h3>
              <p className="text-neutral">Email: shenoy@groovinto.com</p>
              <p className="text-neutral">Phone: +91 87224 46168</p>
              <p className="text-neutral">WhatsApp: +91 87224 46168</p>
              <p className="text-neutral">Availability: Mon-Fri, 9am - 6pm IST</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
