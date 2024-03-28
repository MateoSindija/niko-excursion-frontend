import React from 'react';
import { Locale } from 'i18n.config';
import { IExcursion } from '@/interfaces/excursion.model';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/app/[lang]/dictionaries';

interface IProps {
  lang: Locale;
  excursion: IExcursion;
}

const ExcursionCardSmall = async ({ excursion, lang }: IProps) => {
  const { id, titleImage, price, titleEn, titleHr } = excursion;
  const { excursionCardSmall } = await getDictionary(lang);

  const handleLink = () => {
    return `/${lang}/tours/${id}`;
  };
  return (
    <div className="excursionCardSm">
      <Link href={handleLink()} className="excursionCardSm__imgLink">
        <Image src={titleImage} width={310} height={230} alt={'title'} />
        <div className="excursionCardSm__imgLink__priceContainer">
          <div className="excursionCardSm__imgLink__priceContainer__title">
            {excursionCardSmall.price}
          </div>
          <div className="excursionCardSm__imgLink__priceContainer__price">{`${price}€`}</div>
        </div>
        <div className="excursionCardSm__imgLink__mask" />
      </Link>
      <div className="excursionCardSm__content">
        <Link className="excursionCardSm__content__title" href={handleLink()}>
          {lang === 'hr' ? titleHr : titleEn}
        </Link>
        <div className="excursionCardSm__content__info">
          <Image src="/clock_duration.svg" width={18} height={18} alt="clock" />
          {`${excursionCardSmall.duration} ${excursion?.duration} ${
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
          {`${excursionCardSmall?.maxPerson} ${excursion?.maxPersons}`}
        </div>
      </div>
    </div>
  );
};

export default ExcursionCardSmall;
