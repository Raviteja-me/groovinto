import { MetadataRoute } from 'next';
import { navLinks } from '../lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.groovinto.com';
  const staticRoutes = navLinks.map((link) => ({
    url: `${baseUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: link.href === '/' ? 1 : 0.8
  }));

  return staticRoutes;
}
