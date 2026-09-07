import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://www.groovinto.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Digital Marketing & AI Content Studio | GROOVINTO',
  description:
    'GROOVINTO is a premium content studio and digital growth partner helping brands scale through AI content, storytelling, SEO and performance marketing.',
  keywords: [
    'Digital Marketing',
    'AI Content',
    'Branding',
    'Performance Marketing',
    'GROOVINTO',
    'Aamith Shenoy'
  ],
  openGraph: {
    title: 'Digital Marketing & AI Content Studio | GROOVINTO',
    description:
      'Premium content studio and digital growth partner building digital movements with AI content, storytelling, SEO, and performance marketing.',
    url: siteUrl,
    siteName: 'GROOVINTO',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'GROOVINTO'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GROOVINTO | Digital Marketing & AI Content Studio',
    description:
      'Premium content studio and digital growth partner building digital movements with AI content, storytelling, SEO, and performance marketing.',
    creator: '@groovinto'
  },
  alternates: {
    canonical: siteUrl
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GROOVINTO',
    url: siteUrl,
    logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    description:
      'GROOVINTO is a premium content studio and digital growth partner helping brands scale with AI content, storytelling, and performance marketing.',
    sameAs: ['https://twitter.com/groovinto', 'https://www.linkedin.com/company/groovinto']
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-midnight text-light antialiased">
        {children}
        <div className="cursor-dot" />
        <div className="cursor-outline" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
