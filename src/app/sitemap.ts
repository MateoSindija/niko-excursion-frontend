import { Metadata, MetadataRoute } from 'next';
import getExcursions from '@/app/api/database/getExcursions';
import formatDate from '@/app/utils/formatDate';
import { PUBLIC_URL } from '@/constants/constants';

const formatDateEuropean = (dateString: string) => {
  const dateParts = dateString.split('/');

  return new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const excursions = await getExcursions();
  const excursionsEntries: MetadataRoute.Sitemap = ['hr', 'en'].flatMap(
    (local) => {
      return excursions.map((excursion) => ({
        url: `${PUBLIC_URL}/${local}/tours/${excursion.id}`,
        lastModified: formatDateEuropean(
          formatDate(
            excursion.updatedAt.nanoseconds,
            excursion.updatedAt.seconds,
            false,
          ),
        ),

        changeFrequency: 'yearly',
        priority: 0.5,
      }));
    },
  );

  return [
    {
      url: `${PUBLIC_URL}/hr/about-us`,
    },
    {
      url: `${PUBLIC_URL}/en/about-us`,
    },
    {
      url: `${PUBLIC_URL}/hr/contact`,
    },
    {
      url: `${PUBLIC_URL}/en/contact`,
    },
    ...excursionsEntries,
  ];
}
