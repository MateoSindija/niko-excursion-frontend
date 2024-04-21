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
  const { id, titleImage, price, titleEn, titleHr, isExcursionPublic } =
    excursion;
  const { excursionCardSmall } = await getDictionary(lang);

  const handleLink = () => {
    return `/${lang}/tours/${id}`;
  };
  return (
    <div className="excursionCardSm">
      <Link href={handleLink()} className="excursionCardSm__imgLink">
        <Image
          src={titleImage}
          width={350}
          height={260}
          sizes="(max-width: 350px) 320px 240px"
          alt={'title'}
        />
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
          <div className="excursionCardSm__content__info__container">
            <Image
              src="/clock_duration.svg"
              width={18}
              height={18}
              alt="clock"
            />
            {`${excursionCardSmall.duration} ${excursion?.duration} ${
              lang === 'hr' ? 'Sata' : 'Hours'
            }`}
          </div>
          <Image
            src="/horizontal_line.svg"
            alt="line"
            width={5}
            height={18}
            className="excursionPage__firstCol__subHeader__line"
          />
          <div className="excursionCardSm__content__info__container">
            <Image src="/person.svg" width={18} height={18} alt="clock" />
            {`${excursionCardSmall?.maxPerson} ${excursion?.maxPersons}`}
          </div>
          <Image
            src="/horizontal_line.svg"
            alt="line"
            width={5}
            height={18}
            className="excursionPage__firstCol__subHeader__line"
          />
          <div className="excursionCardSm__content__info__container">
            <Image
              src="/speed_boat.svg"
              alt={'boat'}
              height={18 + 5}
              width={18 + 5}
            />
            <span>{`${excursionCardSmall.type} ${
              excursion.isExcursionPublic
                ? excursionCardSmall.public
                : excursionCardSmall.private
            }`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcursionCardSmall;
