import React from 'react';
import SecondaryPagesContainer from '@/app/components/Containers/SecondaryPagesContainer';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Locale } from 'i18n.config';
import getExcursions from '@/app/api/database/getExcursions';
import PromoCarousel from '@/app/components/Carousels/PromoCarousel/PromoCarousel';
import ExcursionPhotosCarousel from '@/app/components/Carousels/ExcursionPhotosCarousel/ExcursionPhotosCarousel';
import Image from 'next/image';
import ItemsList from '@/app/components/Lists/ItemsList';
import ReserveExcursionForm from '@/app/components/Forms/ReserveExcursionForm';
import { IExcursion } from '@/interfaces/excursion.model';
import getDocumentsWithoutGivenId from '@/app/api/database/getDocumentsWithoutGivenId';
import ExcursionCardSmall from '@/app/components/Cards/ExcursionCardSmall';

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
  const excursionArray = await getExcursions({ id: excursionId });
  const excursionArrayWithoutCurrent =
    await getDocumentsWithoutGivenId(excursionId);
  const excursion: IExcursion | [] = excursionArray[0];

  return (
    <>
      <SecondaryPagesContainer title={excursionPage.title} bgColor={'#F0F3F7'}>
        <div className="excursionPage">
          <div className="excursionPage__firstCol">
            <div className="excursionPage__firstCol__header">
              {lang === 'hr' ? excursion?.titleHr : excursion?.titleEn}
            </div>
            <div className="excursionPage__firstCol__subHeader">
              <Image
                src="/clock_duration.svg"
                width={18}
                height={18}
                alt="clock"
              />
              {`${excursionPage.duration} ${excursion?.duration} ${
                lang === 'hr' ? 'Sata' : 'Hours'
              }`}
              <Image
                src="/horizontal_line.svg"
                alt="line"
                width={5}
                height={18}
                className="excursionPage__firstCol__subHeader__line"
              />
              <Image src="/person.svg" width={18} height={18} alt="clock" />
              {`${excursionPage?.maxPerson} ${excursion?.maxPersons}`}
            </div>
            <ExcursionPhotosCarousel imagesUrl={excursion?.images ?? []} />
            <div className="excursionPage__firstCol__overview">
              <div className="excursionPage__firstCol__overview__title">
                {excursionPage?.overview}
              </div>
              <div className="excursionPage__firstCol__overview__desc">
                {lang === 'hr'
                  ? excursion?.descriptionCro
                  : excursion?.descriptionEng}
              </div>
            </div>
            <div className="excursionPage__firstCol__included">
              <div className="excursionPage__firstCol__included__title">
                {excursionPage.included}
              </div>
              <ItemsList itemsList={excursionPage?.includedItems} />
            </div>
          </div>
          <div className="excursionPage__secondCol">
            <ReserveExcursionForm
              price={excursion?.price}
              maxPassengers={excursion?.maxPersons}
              text={excursionPage.bookTour}
              excursionName={excursion.titleHr}
              isExcursionPublic={excursion.isExcursionPublic}
              excursionStartingHours={excursion.hours}
              id={excursion.id}
            />
          </div>
        </div>
      </SecondaryPagesContainer>
      <div className="otherTours">
        <div className="otherTours__title">{excursionPage?.other}</div>
        <div className="otherTours__list">
          {excursionArrayWithoutCurrent.map((excursion) => {
            return (
              <ExcursionCardSmall
                key={excursion.id}
                lang={lang}
                excursion={excursion}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
