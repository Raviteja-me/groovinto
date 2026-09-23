import type { Metadata } from 'next';
import CourseHero from '../../components/course/CourseHero';
import RegisterForm from '../../components/course/RegisterForm';
import { Audience, Curriculum, FAQ, Includes, Instructor } from '../../components/course/CourseDetails';
import Ticker from '../../components/home/Ticker';
import { COURSE } from '../../lib/course';

export const metadata: Metadata = {
  title: `Register | ${COURSE.name}`,
  description: `${COURSE.headline} ${COURSE.duration}, ${COURSE.sessions}. Register for ₹${COURSE.price}.`,
  openGraph: {
    title: `${COURSE.name} | GROOVINTO Academy`,
    description: COURSE.subheadline
  }
};

export default function RegisterPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: COURSE.name,
    description: COURSE.subheadline,
    provider: { '@type': 'Organization', name: 'GROOVINTO', sameAs: 'https://www.groovinto.com' },
    offers: { '@type': 'Offer', price: COURSE.price, priceCurrency: COURSE.currency, availability: 'https://schema.org/InStock' }
  };

  return (
    <main>
      <CourseHero />
      <Ticker />
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr,0.9fr] lg:gap-20">
          <div className="space-y-24">
            <Audience />
            <Curriculum />
            <Includes />
            <Instructor />
            <FAQ />
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <RegisterForm />
            <p className="mt-4 text-center text-xs text-muted">
              Seats are confirmed in the order payments are received. Questions? WhatsApp us any time.
            </p>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
    </main>
  );
}
