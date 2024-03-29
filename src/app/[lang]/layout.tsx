import '@/styles/app.scss';
import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar/Navbar';
import React, { Suspense, useContext } from 'react';
import { i18n, Locale } from 'i18n.config';
import Footer from '@/app/components/Footer/Footer';
import { getDictionary } from '@/app/[lang]/dictionaries';
import NavbarDictionaryProvider from '@/app/utils/contexts';
import reviews from '@/app/components/Carousels/ReviewsCarousel/Reviews';
import dynamic from 'next/dynamic';
import Loading from '@/app/components/Animations/Loading';

export const metadata: Metadata = {
  title: 'Boat Excursion Niko',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { navigation, footer } = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body>
        <NavbarDictionaryProvider dictionary={navigation}>
          <Navbar lang={params.lang} />
        </NavbarDictionaryProvider>

        <main>{children}</main>

        <NavbarDictionaryProvider dictionary={navigation}>
          <Footer lang={params.lang} footerDictionary={footer} />
        </NavbarDictionaryProvider>
      </body>
    </html>
  );
}
