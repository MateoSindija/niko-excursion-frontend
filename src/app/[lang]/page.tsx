import React, { Suspense } from 'react';
import { Locale } from 'i18n.config';
import PromoCarousel from '@/app/components/Carousels/PromoCarousel/PromoCarousel';
import { getDictionary } from '@/app/[lang]/dictionaries';
import NavbarDictionaryProvider from '@/app/utils/contexts';
import FrontPageContainer from '@/app/components/Containers/FrontPageContainer';
import Gallery from '@/app/components/Carousels/GalleryCarousel/Gallery';
import Reviews from '@/app/components/Carousels/ReviewsCarousel/Reviews';
import { promises as fs } from 'fs';
import ExcursionsCarousel from '@/app/components/Carousels/ExcursionsCarousel/ExcursionsCarousel';
import SignOutButton from '@/app/components/Buttons/SignOutButton';

import dynamic from 'next/dynamic';
import getMostExpensiveExcursions from '@/app/api/database/getMostExpensiveExcursions';
import ExcursionCard from '@/app/components/Cards/ExcursionCard';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const {
    navigation,
    frontPageContainers,
    promoCarouselText,
    reviewCarouselText,
  } = await getDictionary(lang);
  const reviewFile = await fs.readFile(
    process.cwd() + '/public/files/reviews.json',
    'utf8',
  );
  const reviewData = JSON.parse(reviewFile);
  const excursions = await getMostExpensiveExcursions();

  return (
    <>
      <NavbarDictionaryProvider dictionary={navigation}>
        <PromoCarousel lang={lang} text={promoCarouselText} />
      </NavbarDictionaryProvider>
      <FrontPageContainer
        title={frontPageContainers?.galleryTitle}
        titleColor="black"
        backgroundColor="grey"
      >
        <Gallery />
      </FrontPageContainer>
      <FrontPageContainer
        title={frontPageContainers?.reviewsTitle}
        titleColor="white"
        backgroundColor="blue"
      >
        <Reviews lang={lang} reviews={reviewData} />
      </FrontPageContainer>
      <FrontPageContainer
        title={frontPageContainers?.popularExcursions}
        titleColor="black"
        backgroundColor="grey"
      >
        <ExcursionsCarousel text={reviewCarouselText} lang={lang}>
          {excursions.map((excursion) => {
            return (
              <ExcursionCard
                key={excursion.id}
                excursion={excursion}
                lang={lang}
              />
            );
          })}
        </ExcursionsCarousel>
      </FrontPageContainer>
    </>
  );
}
