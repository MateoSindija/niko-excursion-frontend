import React, { Suspense } from 'react';
import { Locale } from 'i18n.config';
import { getDictionary } from '@/app/[lang]/dictionaries';
import SecondaryPagesContainer from '@/app/components/Containers/SecondaryPagesContainer';
import getExcursions from '@/app/api/database/getExcursions';
import ExcursionCard from '@/app/components/Cards/ExcursionCard';
import Loading from '@/app/components/Animations/Loading';
import { wait } from 'next/dist/lib/wait';
import ReactSwitch from 'react-switch';

const Page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { excursionsListText } = await getDictionary(lang);
  const excursions = await getExcursions();
  return (
    <SecondaryPagesContainer title={excursionsListText.title}>
      <div className="excursionsOffer">
        <div className="excursionsOffer__subHeader">
          {excursionsListText.subHeader}
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
