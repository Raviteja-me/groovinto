import Hero from '../components/home/Hero';
import Ticker from '../components/home/Ticker';
import Manifesto from '../components/home/Manifesto';
import ServicesBento from '../components/home/ServicesBento';
import Stats from '../components/home/Stats';
import WorkShowcase from '../components/home/WorkShowcase';
import CoursePromo from '../components/home/CoursePromo';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Manifesto />
      <ServicesBento />
      <Stats />
      <WorkShowcase />
      <CoursePromo />
      <FinalCTA />
    </main>
  );
}
