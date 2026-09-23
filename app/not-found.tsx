import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="glow-orb left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-brand/20" />
      <div className="container-x relative text-center">
        <p className="font-display text-[28vw] font-extrabold leading-none text-outline sm:text-[14rem]">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-cream">This page moved on.</h1>
        <p className="mt-3 text-muted">The link is broken or the page never existed.</p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </main>
  );
}
