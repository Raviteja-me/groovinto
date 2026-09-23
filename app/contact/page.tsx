import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import ContactForm from '../../components/contact/ContactForm';
import Reveal, { Stagger, StaggerItem } from '../../components/fx/Reveal';
import { siteConfig } from '../../lib/data';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with GROOVINTO. AI content, branding and digital growth for ambitious brands.'
};

const steps = [
  { title: 'Tell us your goal', text: 'Share where you want the brand to be. We reply within one business day.' },
  { title: 'Discovery call', text: 'A 30-minute call to understand your audience, channels and numbers.' },
  { title: 'Proposal in 72 hours', text: 'A clear scope, timeline and price. No 40-page decks.' }
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader eyebrow="Contact" title="Let's build the *next movement.*" description="Tell us about your brand, goals and timelines. We will come back with a plan, not a pitch." />

      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <Reveal className="card p-7 sm:p-10">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
            <div className="relative">
              <ContactForm />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" stagger={0.08}>
              {[
                { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: Phone, label: 'Phone', value: siteConfig.phone, href: siteConfig.phoneHref },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: siteConfig.whatsapp },
                { icon: MapPin, label: 'Studio', value: siteConfig.location },
                { icon: Clock, label: 'Hours', value: siteConfig.hours }
              ].map((c) => (
                <StaggerItem key={c.label}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="card card-hover flex items-center gap-4 p-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{c.label}</p>
                        <p className="mt-0.5 text-sm font-medium text-cream">{c.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="card flex items-center gap-4 p-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/10 text-mint">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{c.label}</p>
                        <p className="mt-0.5 text-sm font-medium text-cream">{c.value}</p>
                      </div>
                    </div>
                  )}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2} className="card p-6">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-5 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 font-mono text-[11px] text-brand">{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-cream">{s.title}</p>
                      <p className="mt-0.5 text-xs text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
