import { cache } from 'react';
import getExcursions from '@/app/api/database/getExcursions';

const getCachedExcursions = cache(async (searchIsPrivate: boolean) => {
  return await getExcursions({
    type: searchIsPrivate ? 'private' : 'public',
  });
});

export default getCachedExcursions;
