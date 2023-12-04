'use client';
const handleLangChange = (newLang: string, pathName: string) => {
  if (!pathName) return '/';
  const segments = pathName.split('/');
  segments[1] = newLang;
  return segments.join('/');
};

export default handleLangChange;
