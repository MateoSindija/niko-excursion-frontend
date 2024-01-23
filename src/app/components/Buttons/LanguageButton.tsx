'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { getCurrentLanguage } from '@/app/utils/getCurrentLanguage';
import { useDetectRef } from '@/hooks/useDetectRef';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from 'i18n.config';
import handleLangChange from '@/app/utils/handleLangChange';

const SMALL_FLAG_SIZE = 30;
const LARGE_FLAG_SIZE = 40;
const LanguageButton = () => {
  const pathName = usePathname();
  const currentLang = getCurrentLanguage();
  const dropDownRef = useRef(null);
  const [isSelectorActive, setIsSelectorActive] = useState(false);

  const closeLangMenu = () => {
    setIsSelectorActive(false);
  };

  useDetectRef(dropDownRef, closeLangMenu);
  const handleSelectorClick = () => {
    setIsSelectorActive((prevState) => !prevState);
  };

  return (
    <div className="langContainer">
      <button className="langContainer__button" onClick={handleSelectorClick}>
        <Image
          src={`/flag-${currentLang}.svg`}
          alt="flag"
          width={LARGE_FLAG_SIZE}
          height={LARGE_FLAG_SIZE}
          priority
        />
      </button>
      {isSelectorActive && (
        <div className="langContainer__selector" ref={dropDownRef}>
          {i18n.locales.map((locale) => {
            return (
              <Link
                className="langContainer__selector__option"
                href={handleLangChange(locale, pathName)}
                key={locale}
              >
                <Image
                  src={`/flag-${locale}.svg`}
                  alt={`${locale} flag`}
                  className="langContainer__selector__option__image"
                  width={SMALL_FLAG_SIZE}
                  height={SMALL_FLAG_SIZE}
                />
                <div className="langContainer__selector__option__lang">
                  {locale === 'hr' ? 'Hrvatski' : 'English'}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
