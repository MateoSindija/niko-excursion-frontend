import React from 'react';
import SecondaryPagesContainer from '@/app/components/Containers/SecondaryPagesContainer';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Locale } from 'i18n.config';
import getExcursions from '@/app/api/database/getExcursions';
import PromoCarousel from '@/app/components/Carousels/PromoCarousel/PromoCarousel';
import ExcursionPhotosCarousel from '@/app/components/Carousels/ExcursionPhotosCarousel/ExcursionPhotosCarousel';
import Image from 'next/image';
import ItemsList from '@/app/components/Lists/ItemsList';

const Page = async ({
  params,
}: {
  params: {
    excursionId: string;
    lang: Locale;
  };
}) => {
  const { excursionId, lang } = params;
  const { excursionPage } = await getDictionary(lang);
  const excursionArray = await getExcursions(excursionId);
  const excursion = excursionArray[0];

  return (
    <>
      <SecondaryPagesContainer title={excursionPage.title} bgColor={'#F0F3F7'}>
        <>
          <div className="excursionPage__header">
            {lang === 'hr' ? excursion.titleHr : excursion.titleEn}
          </div>
          <div className="excursionPage__subHeader">
            <Image
              src="/clock_duration.svg"
              width={18}
              height={18}
              alt="clock"
            />
            {`${excursionPage.duration} ${excursion.duration} ${
              lang === 'hr' ? 'Sata' : 'Hours'
            }`}
            <Image
              src="/horizontal_line.svg"
              alt="line"
              width={5}
              height={18}
              className="excursionPage__subHeader__line"
            />
            <Image src="/person.svg" width={18} height={18} alt="clock" />
            {`${excursionPage.maxPerson} ${excursion.maxPersons}`}
          </div>
          <ExcursionPhotosCarousel imagesUrl={excursion.images ?? []} />
          <div className="excursionPage__overview">
            <div className="excursionPage__overview__title">
              {excursionPage.overview}
            </div>
            <div className="excursionPage__overview__desc">
              {lang === 'hr'
                ? excursion.descriptionCro
                : excursion.descriptionEng}
            </div>
          </div>
          <div className="excursionPage__included">
            <div className="excursionPage__included__title">
              {excursionPage.included}
            </div>
            <ItemsList itemsList={excursionPage.includedItems} />
          </div>
        </>
      </SecondaryPagesContainer>
      <div className="otherTours">
        <div className="otherTours__title">{excursionPage.other}</div>
      </div>
    </>
  );
};

export default Page;
