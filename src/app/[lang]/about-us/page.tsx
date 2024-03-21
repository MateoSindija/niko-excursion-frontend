import exp from 'constants';
import SecondaryPagesContainer from '@/app/components/Containers/SecondaryPagesContainer';
import { Locale } from 'i18n.config';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Suspense } from 'react';

const AboutUs = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { aboutUs } = await getDictionary(lang);
  const lastPartOfTitle = aboutUs.title.split(' ').splice(-2).join(' ');
  const firstPartOfTitle = aboutUs.title.split(' ').splice(0, 2).join(' ');
  return (
    <SecondaryPagesContainer title={aboutUs.mainTitle}>
      <div className="aboutUsPage">
        <div className="aboutUsPage__subHeader">{aboutUs.subHeader}</div>
        <div className="aboutUsPage__title">
          <span className="aboutUsPage__title__firstPart">
            {firstPartOfTitle + ' '}
          </span>
          <span className="aboutUsPage__title__lastPart">
            {lastPartOfTitle}
          </span>
        </div>
        <div className="aboutUsPage__desc">{aboutUs.description}</div>
      </div>
    </SecondaryPagesContainer>
  );
};
export default AboutUs;
