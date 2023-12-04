import React from 'react';
import { Locale } from 'i18n.config';
import PromoCarousel from '@/app/components/Carousels/PromoCarousel/PromoCarousel';
import { getDictionary } from '@/app/[lang]/dictionaries';
import NavbarDictionaryProvider from '@/app/utils/contexts';
import FrontPageContainer from '@/app/components/Containers/FrontPageContainer';
import Gallery from '@/app/components/Gallery/Gallery';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { navigation } = await getDictionary(lang);
  return (
    <>
      <NavbarDictionaryProvider dictionary={navigation}>
        <PromoCarousel lang={lang} />
      </NavbarDictionaryProvider>
      <FrontPageContainer
        title="Picture Gallery"
        titleColor="black"
        backgroundColor="grey"
      >
        <Gallery />
      </FrontPageContainer>
    </>
  );
}
