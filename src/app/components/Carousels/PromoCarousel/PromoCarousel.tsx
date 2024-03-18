'use client';
import React, { useEffect, useRef, useState } from 'react';
import NavbarHomePage from '@/app/components/Navbar/NavbarHomePage';
import { useDetectWindowSize } from '@/hooks/useDetectWindowSize';
import {
  BUTTON_OPACITY_LOWER,
  SLIDE_DURATION,
  TABLET_NAVBAR_BREAKPOINT,
} from '@/constants/constants';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import CarouselControllerButton from '@/app/components/Buttons/CarouselControllerButton';
import Image from 'next/image';

interface IProps {
  lang: string;
  text: [
    {
      header: string;
      subHeader: string;
    },
  ];
}

const PromoCarousel = ({ lang, text }: IProps) => {
  const windowSize = useDetectWindowSize();
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const slideRef = currentImage === 0 ? firstRef : secondRef;
  const imagesPath = ['/island_promo_1.jpeg', '/island_promo_1.jpeg'];
  const [buttonOpacity, setButtonOpacity] = useState(BUTTON_OPACITY_LOWER);

  const nextSlide = () => {
    if (currentImage === imagesPath.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prevState) => prevState + 1);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => {
      clearTimeout(timer);
    };
  }, [currentImage]);

  const prevSlide = () => {
    if (currentImage === 0) {
      setCurrentImage(imagesPath.length - 1);
    } else {
      setCurrentImage((prevState) => prevState - 1);
    }
  };

  return (
    <div
      className="promoCarousel"
      onMouseEnter={() => setButtonOpacity(1)}
      onMouseLeave={() => setButtonOpacity(BUTTON_OPACITY_LOWER)}
    >
      {windowSize >= TABLET_NAVBAR_BREAKPOINT && <NavbarHomePage lang={lang} />}
      <div className="promoCarousel__carousel">
        <CarouselControllerButton
          onClick={prevSlide}
          buttonStyle={{ opacity: buttonOpacity }}
          direction="previous"
          background="white"
          className="promoCarousel__carousel__button button--prev"
        />
        <CarouselControllerButton
          onClick={nextSlide}
          direction="next"
          buttonStyle={{ opacity: buttonOpacity }}
          background="white"
          className="promoCarousel__carousel__button button--next"
        />
        <div className="promoCarousel__carousel__text">
          <h1 className="promoCarousel__carousel__text__header">
            {text[currentImage].header}
          </h1>
          <div className="promoCarousel__carousel__text__subheader">
            {text[currentImage].subHeader}
          </div>
        </div>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={currentImage}
            nodeRef={slideRef}
            addEndListener={(done: () => void) => {
              if (slideRef.current !== null) {
                // Assert the type of slideRef.current to HTMLElement
                const slideElement = slideRef.current as HTMLElement;
                slideElement.addEventListener('transitionend', done, false);
              }
            }}
            classNames="fade"
          >
            <Image
              key={currentImage}
              src={imagesPath[currentImage]}
              alt="Island Promo"
              fill
              quality={100}
              className="promoCarousel__carousel__slide"
              ref={slideRef}
              placeholder="blur"
              blurDataURL={imagesPath[currentImage]}
            />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default PromoCarousel;
