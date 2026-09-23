import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Manrope, Space_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '../lib/data';
import SmoothScroll from '../components/fx/SmoothScroll';
import Cursor from '../components/fx/Cursor';
import ScrollProgress from '../components/fx/ScrollProgress';
import Splash from '../components/fx/Splash';
import PageTransition from '../components/fx/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'GROOVINTO | AI Content Studio & Digital Growth Partner',
    template: '%s | GROOVINTO'
  },
  description:
    'GROOVINTO is a premium content studio and digital growth partner. We build digital movements with AI content, branding, storytelling and performance marketing.',
  keywords: ['Digital Marketing', 'AI Content', 'AI Video Course', 'Branding', 'Performance Marketing', 'GROOVINTO', 'Aamith Shenoy', 'Bengaluru'],
  openGraph: {
    title: 'GROOVINTO | AI Content Studio & Digital Growth Partner',
    description: 'We build digital movements with AI content, storytelling and performance marketing.',
    url: siteConfig.url,
    siteName: 'GROOVINTO',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'GROOVINTO. Guide. Gain. Grow.' }],
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GROOVINTO | AI Content Studio & Digital Growth Partner',
    description: 'We build digital movements with AI content, storytelling and performance marketing.',
    images: ['/og.png'],
    creator: '@groovinto'
  },
  alternates: { canonical: siteConfig.url }
};

export const viewport: Viewport = {
  themeColor: '#07070A',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GROOVINTO',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo/logo-full.png`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    founder: { '@type': 'Person', name: siteConfig.founder },
    description: 'Premium content studio and digital growth partner building digital movements with AI content, storytelling and performance marketing.',
    sameAs: siteConfig.socials.map((s) => s.href)
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-cream antialiased">
        <SmoothScroll>
          <Splash />
          <PageTransition />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
          <Cursor />
          <div className="grain" aria-hidden />
        </SmoothScroll>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </body>
    </html>
  );
}
