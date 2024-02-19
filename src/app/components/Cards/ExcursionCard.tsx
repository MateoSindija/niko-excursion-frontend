import React from 'react';
import Image from 'next/image';
import { Locale } from 'i18n.config';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Link from 'next/link';

interface IProps {
  excursion: IExcursion;
  lang: Locale;
}

const SVG_DIMENSION = 15;
const SVG_LINE_WIDTH = 5;
const ExcursionCard = async ({ excursion, lang }: IProps) => {
  const {
    id,
    titleImage,
    titleHr,
    titleEn,
    descriptionEng,
    descriptionCro,
    maxPersons,
    duration,
    price,
  } = excursion;
  const { excursionCard } = await getDictionary(lang);

  return (
    <div className="excursionCard">
      <div className="excursionCard__imageContainer">
        <Image
          className="excursionCard__imageContainer__image"
          src={titleImage}
          alt={'promo'}
          sizes="(max-width: 800px) 100%, 270px"
          fill
        />
      </div>
      <div className="excursionCard__info">
        <div className="excursionCard__info__header">
          {lang === 'hr' ? titleHr : titleEn}
        </div>
        <div className="excursionCard__info__subHeader">
          <div className="excursionCard__info__subHeader__duration">
            <Image
              src="/clock_duration.svg"
              alt={'clock'}
              height={SVG_DIMENSION}
              width={SVG_DIMENSION}
            />
            <span>
              {excursionCard.duration +
                ' ' +
                duration +
                ' ' +
                excursionCard.hours}
            </span>
          </div>
          <Image
            src="/horizontal_line.svg"
            alt={'line'}
            height={SVG_DIMENSION}
            width={SVG_LINE_WIDTH}
          />
          <div className="excursionCard__info__subHeader__persons">
            <Image
              src="/person.svg"
              alt={'person'}
              height={SVG_DIMENSION}
              width={SVG_DIMENSION}
            />
            <span>{'Max: ' + maxPersons + ' ' + excursionCard.persons}</span>
          </div>
        </div>
        <div className="excursionCard__info__desc">
          {lang === 'hr' ? descriptionCro : descriptionEng}
        </div>
        <div className="excursionCard__info__booking">
          <Link
            href={`/${lang}/tours/${id}`}
            className="excursionCard__info__booking__button"
          >
            {excursionCard.button}
          </Link>
          <div className="excursionCard__info__booking__price">
            <div className="excursionCard__info__booking__price__upper">
              {excursionCard.price}
            </div>
            <div className="excursionCard__info__booking__price__lower">
              {price + ' €'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcursionCard;
