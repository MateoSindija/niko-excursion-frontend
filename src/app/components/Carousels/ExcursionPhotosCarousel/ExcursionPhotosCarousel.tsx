'use client';
import React, { useCallback, useRef, useState } from 'react';
import {
  BUTTON_OPACITY_LOWER,
  TABLET_NAVBAR_BREAKPOINT,
} from '@/constants/constants';
import NavbarHomePage from '@/app/components/Navbar/NavbarHomePage';
import CarouselControllerButton from '@/app/components/Buttons/CarouselControllerButton';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import ImageModal from '@/app/components/Modals/ImageModal';
import Autoplay from 'embla-carousel-autoplay';

interface IProps {
  imagesUrl: string[];
}

const autoPlayOptions = { stopOnInteraction: true };
const ExcursionPhotosCarousel = (props: IProps) => {
  const { imagesUrl } = props;
  const [buttonOpacity, setButtonOpacity] = useState(BUTTON_OPACITY_LOWER);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoPlayOptions),
  ]);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div
      className="excursionPhotosCarousel"
      onMouseEnter={() => setButtonOpacity(1)}
      onMouseLeave={() => setButtonOpacity(BUTTON_OPACITY_LOWER)}
    >
      <CarouselControllerButton
        onClick={onPrevButtonClick}
        buttonStyle={{ opacity: buttonOpacity }}
        direction="previous"
        background="white"
        className="excursionPhotosCarousel__button button--prev"
      />
      <CarouselControllerButton
        onClick={onNextButtonClick}
        direction="next"
        buttonStyle={{ opacity: buttonOpacity }}
        background="white"
        className="excursionPhotosCarousel__button button--next"
      />
      <div ref={emblaRef} className="excursionPhotosCarousel__viewport">
        <div className="excursionPhotosCarousel__viewport__carousel">
          {imagesUrl.map((url) => {
            return (
              <div
                className="excursionPhotosCarousel__viewport__carousel__slide"
                key={url}
              >
                <ImageModal
                  src={url}
                  alt="Island Promo"
                  quality={100}
                  placeholder="blur"
                  width={100}
                  height={500}
                  className="excursionPhotosCarousel__viewport__carousel__slide__image"
                  blurDataURL={url}
                  sizes="(max-width: 400px) 1920px, 500px"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExcursionPhotosCarousel;
