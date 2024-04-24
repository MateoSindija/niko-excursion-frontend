import { Metadata, MetadataRoute } from 'next';
import { PUBLIC_URL } from '@/constants/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${PUBLIC_URL}/sitemap.xml`,
  };
}
