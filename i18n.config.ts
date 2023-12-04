export const i18n = {
  defaultLocale: 'hr',
  locales: ['en', 'hr'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
