import 'server-only';

const dictionaries = {
  hr: () =>
    import('@/app/dictionaries/hr.json').then((module) => module.default),
  en: () =>
    import('@/app/dictionaries/en.json').then((module) => module.default),
};

// @ts-ignore
export const getDictionary = async (locale) => dictionaries[locale]();
