import type { Metadata } from 'next';
import PageHeader from '../../components/layout/PageHeader';
import WorkGrid from '../../components/work/WorkGrid';
import Testimonials from '../../components/home/Testimonials';
import FinalCTA from '../../components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected campaigns, brand films, reels and growth programs by GROOVINTO.'
};

export default function PortfolioPage() {
  return (
    <main>
      <PageHeader eyebrow="Selected work" title="Campaigns, films and systems that *moved the needle.*" description="A few of the stories we have told and the numbers they moved. Click any project for the details." />
      <WorkGrid />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
