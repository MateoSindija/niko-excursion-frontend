'use client';
import React from 'react';
import { IReview } from '@/app/interfaces/reviews.model';
import ReviewContainer from '@/app/components/Carousels/ReviewsCarousel/ReviewContainer';
import { Locale } from 'i18n.config';
import useEmblaCarousel from 'embla-carousel-react';
import {
  CarouselDotButton,
  useDotButton,
} from '@/app/components/Carousels/CarouselDotButtons';
import Autoplay from 'embla-carousel-autoplay';

interface IProps {
  reviews: IReview[];
  lang: Locale;
}
const Reviews = ({ reviews, lang }: IProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
    },
    [Autoplay({ stopOnInteraction: false })],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="reviewsSlider">
      <div className="reviewsSlider__viewport" ref={emblaRef}>
        <div className="reviewsSlider__container">
          {reviews.map((review, index) => {
            return (
              <div className="reviewsSlider__slide" key={review.name}>
                <ReviewContainer
                  userName={review.authorAttribution.displayName}
                  review={
                    lang === 'en' ? review.originalText.text : review.text.text
                  }
                  userImg={review.authorAttribution.photoUri}
                  starsCount={review.rating}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="reviewsSlider__dots">
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
    </div>
  );
};

export default Reviews;
