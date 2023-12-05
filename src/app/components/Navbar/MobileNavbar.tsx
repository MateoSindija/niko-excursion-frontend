import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LinkList from '@/app/components/Navbar/LinkList';
import { usePathname } from 'next/navigation';
import { getCurrentLanguage } from '@/app/utils/getCurrentLanguage';
import handleLangChange from '@/app/utils/handleLangChange';
import { i18n } from 'i18n.config';
import Link from 'next/link';
import Logo from '@/app/components/Logo/Logo';
import { useDisableBodyScroll } from '@/app/hooks/useDisableBodyScroll';

const EXIT_BUTTON_SIZE = 15;
const SMALL_FLAG_SIZE = 17;
const SOCIAL_BTN_SIZE = 20;
const HAMBURGER_ICON_SIZE = 40;
interface IProps {
  lang: string;
}
const MobileNavbar = ({ lang }: IProps) => {
  const currentLang = getCurrentLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const pathname = usePathname();

  useDisableBodyScroll(isDashboardOpen);

  return (
    <div className="navbar mobileNavbar">
      <Logo />
      <button
        className="mobileNavbar__hamburger"
        onClick={() => setIsDashboardOpen(true)}
      >
        <Image
          src="/hamburger_menu_icon.svg"
          alt="hamburger"
          width={HAMBURGER_ICON_SIZE}
          height={HAMBURGER_ICON_SIZE}
          priority={true}
        />
      </button>
      {isDashboardOpen && (
        <div className="mobileNavbar__dashboard">
          <div
            className="mobileNavbar__dashboard__backdrop"
            onClick={() => setIsDashboardOpen(false)}
          />
          <div className="mobileNavbar__dashboard__content">
            <button
              onClick={() => setIsDashboardOpen(false)}
              className="mobileNavbar__dashboard__content__close"
            >
              <Image
                src={'/x_icon.svg'}
                alt={'x'}
                width={EXIT_BUTTON_SIZE}
                height={EXIT_BUTTON_SIZE}
              />
            </button>
            <div>Logo</div>
            <LinkList
              lang={lang}
              className={'link mobileNavbar__dashboard__content__link'}
              pathname={pathname}
              isStyleActive={false}
              handleClick={() => setIsDashboardOpen(false)}
            />
            <div className="link mobileNavbar__dashboard__content__linkDrop">
              <div
                className="mobileNavbar__dashboard__content__linkDrop__select"
                onClick={() => setIsLangDropdownOpen((prevState) => !prevState)}
              >
                <Image
                  src={`/flag-${currentLang}.svg`}
                  alt="flag"
                  width={27}
                  height={27}
                />
                <div className="mobileNavbar__dashboard__content__linkDrop__select__lang">
                  {currentLang === 'en' ? 'English' : 'Hrvatski'}
                </div>
                <div className="mobileNavbar__dashboard__content__linkDrop__select__arrow">
                  <Image
                    src={
                      isLangDropdownOpen
                        ? '/arrow_up_icon.svg'
                        : '/arrow_down_icon.svg'
                    }
                    alt={'down'}
                    height={EXIT_BUTTON_SIZE}
                    width={EXIT_BUTTON_SIZE}
                  />
                </div>
              </div>
              {isLangDropdownOpen && (
                <div className="mobileNavbar__dashboard__content__linkDrop__dropdown">
                  {i18n.locales.map((locale) => {
                    return (
                      <Link
                        className="mobileNavbar__dashboard__content__linkDrop__dropdown__btn"
                        href={handleLangChange(locale, pathname)}
                        key={locale}
                      >
                        <Image
                          src={`/flag-${locale}.svg`}
                          alt={locale}
                          width={SMALL_FLAG_SIZE}
                          height={SMALL_FLAG_SIZE}
                        />
                        <div className="mobileNavbar__dashboard__content__linkDrop__dropdown__btn__text">
                          {locale === 'en' ? 'English' : 'Hrvatski'}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mobileNavbar__dashboard__content__social">
              <button className="mobileNavbar__dashboard__content__social__btn">
                <Image
                  src="/instagram_icon.svg"
                  alt="instagram"
                  width={SOCIAL_BTN_SIZE}
                  height={SOCIAL_BTN_SIZE}
                />
              </button>
              <button className="mobileNavbar__dashboard__content__social__btn">
                <Image
                  src="/facebook_icon.svg"
                  alt="facebook"
                  width={SOCIAL_BTN_SIZE}
                  height={SOCIAL_BTN_SIZE}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
