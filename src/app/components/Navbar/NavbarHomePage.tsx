'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import LanguageButton from '@/app/components/Buttons/LanguageButton';
import SocialMediaButton from '@/app/components/Buttons/SocialMediaButton';
import LinkList from '@/app/components/Navbar/LinkList';

interface IProps {
  lang: string;
}
const NavbarHomePage = ({ lang }: IProps) => {
  const pathname = usePathname();

  return (
    <div className="navbar__content__navigation__bottom">
      <LinkList lang={lang} pathname={pathname} className="navbar__link" />
      <div className="navbar__socialMedia">
        <LanguageButton />
        <SocialMediaButton
          type="facebook"
          shape="rectangle"
          background="white"
        />
        <SocialMediaButton
          type="instagram"
          shape="rectangle"
          background="white"
        />
      </div>
    </div>
  );
};

export default NavbarHomePage;
