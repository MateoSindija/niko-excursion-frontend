'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from '@/app/components/Logo/Logo';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import { useDetectWindowSize } from '@/hooks/useDetectWindowSize';
import {
  MOBILE_NAVBAR_BREAKPOINT,
  TABLET_NAVBAR_BREAKPOINT,
} from '@/constants/constants';
import { useDetectRef } from '@/hooks/useDetectRef';
import Image from 'next/image';
import { useDisableBodyScroll } from '@/hooks/useDisableBodyScroll';

const AdminNavbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const contentRef = useRef(null);
  const size = useDetectWindowSize();
  useDetectRef(contentRef, () => setIsSidebarVisible(false));

  useDisableBodyScroll(isSidebarVisible);

  return size > TABLET_NAVBAR_BREAKPOINT ? (
    <nav className="adminNavbarDesktop">
      <div className="adminNavbarDesktop__links">
        <Logo />
        <Link href={'/admin/new-excursion'}>Nova eskurzija</Link>
        <Link href={'/admin/calendar'}>Kalendar</Link>
        <Link href={'/admin/excursions'}>Eskurzije</Link>
        <Link href={'/admin/requested-excursions'}>Zahtjevi</Link>
      </div>
      <SignOutButton />
    </nav>
  ) : (
    <nav className="adminNavbarMobile">
      <div className="adminNavbarMobile__header">
        <Logo />
        <button onClick={() => setIsSidebarVisible(true)}>
          <Image
            src={'/hamburger_menu_icon.svg'}
            alt={'hamburger'}
            priority
            width={40}
            height={40}
          />
        </button>
      </div>
      {isSidebarVisible && (
        <>
          <div className="adminNavbarMobile__overlay" />
          <div className="adminNavbarMobile__content" ref={contentRef}>
            <Link
              href={'/admin/new-excursion'}
              onClick={() => setIsSidebarVisible(false)}
            >
              Nova eskurzija
            </Link>
            <Link
              href={'/admin/calendar'}
              onClick={() => setIsSidebarVisible(false)}
            >
              Kalendar
            </Link>
            <Link
              href={'/admin/excursions'}
              onClick={() => setIsSidebarVisible(false)}
            >
              Eskurzije
            </Link>
            <Link
              href={'/admin/requested-excursions'}
              onClick={() => setIsSidebarVisible(false)}
            >
              Zahtjevi
            </Link>
            <SignOutButton />
          </div>
        </>
      )}
    </nav>
  );
};

export default AdminNavbar;
