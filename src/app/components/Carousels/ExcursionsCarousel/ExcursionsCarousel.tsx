'use client';
import React from 'react';
import { Locale } from 'i18n.config';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import ExcursionCard from '@/app/components/Cards/ExcursionCard';
import { IExcursion } from '@/interfaces/excursion.model';
import Autoplay from 'embla-carousel-autoplay';
import {
  CarouselDotButton,
  useDotButton,
} from '@/app/components/Carousels/CarouselDotButtons';

interface IProps {
  text: { buttonTxt: string };
  children: JSX.Element[];
  lang: Locale;
}

const autoPlayOptions = { stopOnInteraction: false };
const ExcursionsCarousel = (props: IProps) => {
  const { text, children, lang } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoPlayOptions),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="excursionCarousel">
      <div className="excursionCarousel__viewport" ref={emblaRef}>
        <div className="excursionCarousel__viewport__carousel">
          {children.map((child, index) => (
            <div
              key={index}
              className="excursionCarousel__viewport__carousel__slide"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="excursionCarousel__dots">
        {scrollSnaps.map((_, index) => (
          <CarouselDotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'reviewsSlider__dots__dot'.concat(
              index === selectedIndex
                ? ' reviewsSlider__dots__dot--selected'
                : '',
            )}
          />
        ))}
      </div>
      <Link href={`/${lang}/tours`} className="excursionCarousel__allBtn">
        {text.buttonTxt}
      </Link>
    </div>
  );
};

export default ExcursionsCarousel;
