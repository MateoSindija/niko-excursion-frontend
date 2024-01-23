import 'server-only';

const dictionaries = {
  hr: () => import('@/dictionaries/hr.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

// @ts-ignore
export const getDictionary = async (locale) => dictionaries[locale]();
