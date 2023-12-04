export const handleActiveLink = (
  callingLink: string,
  lang: string,
  pathname: string,
) => {
  if (callingLink === pathname) {
    return { color: '#D5AE82FF' };
  } else if (pathname !== `/${lang}`) {
    return { color: 'black' };
  }
  return {};
};
