import { MetadataRoute } from 'next';
import { navLinks, siteConfig } from '../lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({
    url: `${siteConfig.url}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: link.href === '/' ? 1 : link.href === '/register' ? 0.9 : 0.8
  }));
}
