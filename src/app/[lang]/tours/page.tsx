import React, { Suspense } from 'react';
import { Locale } from 'i18n.config';
import { getDictionary } from '@/app/[lang]/dictionaries';
import SecondaryPagesContainer from '@/app/components/Containers/SecondaryPagesContainer';
import getExcursions from '@/app/api/database/getExcursions';
import ExcursionCard from '@/app/components/Cards/ExcursionCard';
import Loading from '@/app/components/Animations/Loading';
import { wait } from 'next/dist/lib/wait';
import ReactSwitch from 'react-switch';
import ToggleButton from '@/app/components/Buttons/ToggleButton';
import { redirect } from 'next/navigation';

const Page = async ({
  params: { lang },
  searchParams: { isPrivate },
}: {
  params: {
    lang: Locale;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { excursionsListText } = await getDictionary(lang);
  const searchIsPrivate = isPrivate === 'false';
  const excursions = await getExcursions({
    type: searchIsPrivate ? 'private' : 'public',
  });

  return (
    <SecondaryPagesContainer title={excursionsListText.title}>
      <div className="excursionsOffer">
        <div className="excursionsOffer__subHeader">
          <div className="excursionsOffer__subHeader__title">
            {excursionsListText.subHeader}
          </div>
          <ToggleButton
            defaultToggle={searchIsPrivate}
            firstOption={excursionsListText.toggleFilter.fistOption}
            secondOption={excursionsListText.toggleFilter.secondOption}
          />
          <div className="excursionsOffer__subHeader__desc">
            {excursionsListText.toggleFilter.desc}
          </div>
        </div>

        {excursions.map((excursion) => {
          return (
            <ExcursionCard
              excursion={excursion}
              lang={lang}
              key={excursion.id}
            />
          );
        })}
      </div>
    </SecondaryPagesContainer>
  );
};

export default Page;
