'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { handleActiveLink } from '@/app/utils/handleActiveLink';
import { NavbarContext } from '@/app/utils/contexts';

interface IProps {
  lang: string;
  pathname?: string;
  isStyleActive?: boolean;
  isTabletNavbarActive?: boolean;
  className?: string;
  handleClick?: (type: string, event: React.MouseEvent) => void;
}
const LinkList = ({
  lang,
  pathname,
  isStyleActive = true,
  isTabletNavbarActive = false,
  className,
  handleClick,
}: IProps) => {
  const dictionary = useContext(NavbarContext);

  const handleStyle = (callingLink: string) => {
    if (isStyleActive && pathname && pathname !== `/${lang}`) {
      return handleActiveLink(callingLink, lang, pathname);
    } else if (pathname === `/${lang}` && isTabletNavbarActive) {
      return { color: 'black' };
    }
    return {};
  };

  return (
    <>
      <Link
        className={className}
        style={handleStyle(`/${lang}`)}
        href={`/${lang}`}
        onClick={(e) => handleClick !== undefined && handleClick('home', e)}
      >
        {dictionary?.home}
      </Link>
      <Link
        className={className}
        href={`/${lang}/about-us`}
        style={handleStyle(`/${lang}/about-us`)}
        onClick={(e) => handleClick !== undefined && handleClick('about-us', e)}
      >
        {dictionary?.aboutUs}
      </Link>
      <Link
        className={className}
        href={`/${lang}/contact`}
        style={handleStyle(`/${lang}/contact`)}
        onClick={(e) => handleClick !== undefined && handleClick('contact', e)}
      >
        {dictionary?.contact}
      </Link>
      <Link
        className={className}
        href={`/${lang}/tours`}
        style={handleStyle(`/${lang}/tours`)}
        onClick={(e) => handleClick !== undefined && handleClick('tours', e)}
      >
        {dictionary?.tours}
      </Link>
    </>
  );
};

export default LinkList;
