import React, { cache } from 'react';
import SecondaryPagesContainer from '@/app/components/Containers/SecondaryPagesContainer';
import { Locale } from 'i18n.config';
import { getDictionary } from '@/app/[lang]/dictionaries';
import InfoCard from '@/app/components/Cards/InfoCard';
import ContactForm from '@/app/components/Forms/ContactForm';
import GoogleMap from '@/app/components/Maps/GoogleMap';
import { wait } from 'next/dist/lib/wait';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Contact us',
    description: 'Contact us via whatsapp or email',
  };
}

const Page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { contact } = await getDictionary(lang);
  const infoArray: Array<'address' | 'phone' | 'email' | 'hours'> = [
    'address',
    'phone',
    'email',
    'hours',
  ];

  return (
    <SecondaryPagesContainer title={contact.title}>
      <>
        <div className="contactInfoContainer">
          {infoArray.map((type) => {
            return <InfoCard text={contact} type={type} key={type} />;
          })}
        </div>
        <div className="contactLocationContainer">
          <ContactForm text={contact.form} />
          <GoogleMap />
        </div>
      </>
    </SecondaryPagesContainer>
  );
};

export default Page;
