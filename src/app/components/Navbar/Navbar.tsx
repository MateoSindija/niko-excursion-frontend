'use client';

import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { Locale } from 'i18n.config';
import LanguageButton from '@/app/components/Buttons/LanguageButton';
import LinkList from '@/app/components/Navbar/LinkList';
import MobileNavbar from '@/app/components/Navbar/MobileNavbar';
import { useDetectWindowSize } from '@/hooks/useDetectWindowSize';
import {
  MOBILE_NAVBAR_BREAKPOINT,
  TABLET_NAVBAR_BREAKPOINT,
} from '@/constants/constants';
import Logo from '@/app/components/Logo/Logo';
import { NavbarContext } from '@/app/utils/contexts';
import { EMAIL, PHONE_NUMBER } from '@/constants/contact';
import PhoneIcon from '@/app/utils/vectors/PhoneIcon';
import MailIcon from '@/app/utils/vectors/MailIcon';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  lang: Locale;
}

const TOP_NAVBAR_ICON_SIZE = 14;
const SCROLL_LENGTH_UNTIL_NAVBAR_CHANGE = 200;
const Navbar = ({ lang }: IProps) => {
  const pathname = usePathname();
  const windowLength = useDetectWindowSize();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const dictionary = useContext(NavbarContext);
  const refSlideDown = useRef(null);

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
              <div className="navbar__content__navigation__top__contact">
                <PhoneIcon size={TOP_NAVBAR_ICON_SIZE} /> {dictionary?.phone}:{' '}
                {PHONE_NUMBER}
              </div>
              <div className="navbar__content__navigation__top__contact">
                <MailIcon size={18} /> Email: {EMAIL}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <CSSTransition
        in={isNavbarVisible}
        nodeRef={refSlideDown}
        timeout={300}
        unmountOnExit
        classNames={'slide-down'}
      >
        <div className="navbar__contentSecond" ref={refSlideDown}>
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
      </CSSTransition>
      {windowLength > 0 && handleWhatNavToRender()}
    </nav>
  );
};

export default Navbar;
