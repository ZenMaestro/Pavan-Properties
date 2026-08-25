import { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';
import { connectToDatabase } from '@/lib/mongodb';
import { ProjectModel } from '@/models/Project';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pavan-properties.vercel.app';

  let propertySlugs = PROJECTS.map((p) => p.slug);

  try {
    const mongooseInstance = await connectToDatabase();
    if (mongooseInstance) {
      const dbProperties = await ProjectModel.find({}, 'slug updatedAt').lean();
      if (dbProperties && dbProperties.length > 0) {
        propertySlugs = Array.from(new Set([...propertySlugs, ...dbProperties.map((p: any) => p.slug)]));
      }
    }
  } catch (err) {
    console.warn('Sitemap fallback to static projects.');
  }

  const projectRoutes = propertySlugs.map((slug) => ({
    url: `${baseUrl}/property/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/property/anvi-homes-kesarapalli`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/luxury`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/photos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectRoutes,
  ];
}
