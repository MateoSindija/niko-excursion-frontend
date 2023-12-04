'use client';

import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Locale } from 'i18n.config';
import LanguageButton from '@/app/components/Buttons/LanguageButton';
import LinkList from '@/app/components/Navbar/LinkList';
import MobileNavbar from '@/app/components/Navbar/MobileNavbar';
import { useDetectWindowSize } from '@/app/hooks/useDetectWindowSize';
import {
  MOBILE_NAVBAR_BREAKPOINT,
  TABLET_NAVBAR_BREAKPOINT,
} from '@/app/constants/constants';
import Logo from '@/app/components/Logo/Logo';
import { NavbarContext } from '@/app/utils/contexts';

interface IProps {
  lang: Locale;
}

const SCROLL_LENGTH_UNTIL_NAVBAR_CHANGE = 200;
const Navbar = ({ lang }: IProps) => {
  const pathname = usePathname();
  const windowLength = useDetectWindowSize();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY >= SCROLL_LENGTH_UNTIL_NAVBAR_CHANGE ||
        pathname !== `/${lang}`
      ) {
        setIsNavbarVisible(true);
      } else if (windowLength <= TABLET_NAVBAR_BREAKPOINT) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, windowLength]);

  const handleWhatNavToRender = () => {
    if (windowLength <= MOBILE_NAVBAR_BREAKPOINT) {
      return <MobileNavbar lang={lang} />;
    } else if (
      pathname === `/${lang}` &&
      windowLength >= TABLET_NAVBAR_BREAKPOINT
    ) {
      return (
        <div className="navbar__content">
          <div className="navbar__content__logo">
            <Logo />
          </div>
          <div className="navbar__content__navigation">
            <div className="navbar__content__navigation__top">
              <div>Phone</div>
              <div>Email</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      {isNavbarVisible && (
        <div className="navbar__contentSecond">
          <div className="navbar__contentSecond__logo">
            <Logo />
          </div>
          <div className="navbar__contentSecond__navigation">
            <LanguageButton />
            <LinkList
              isTabletNavbarActive={true}
              lang={lang}
              pathname={pathname}
              className="navbar__link"
            />
          </div>
        </div>
      )}
      {windowLength > 0 && handleWhatNavToRender()}
    </nav>
  );
};

export default Navbar;
