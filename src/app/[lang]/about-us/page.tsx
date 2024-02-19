import exp from 'constants';
import SecondaryPagesContainer from '@/app/components/Containers/SecondaryPagesContainer';
import { Locale } from 'i18n.config';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Suspense } from 'react';

const AboutUs = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { aboutUs } = await getDictionary(lang);
  return (
    <SecondaryPagesContainer title={aboutUs.title}>
      <div>About us</div>
    </SecondaryPagesContainer>
  );
};
export default AboutUs;
