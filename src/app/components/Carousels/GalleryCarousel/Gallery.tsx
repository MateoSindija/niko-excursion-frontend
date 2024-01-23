'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay';
import ImageModal from '@/app/components/Modals/ImageModal';

const autoPlayOptions = { stopOnInteraction: false };
const options: EmblaOptionsType = { align: 'start', loop: false };
const Gallery = () => {
  const [emblaRefTop] = useEmblaCarousel(options, [Autoplay(autoPlayOptions)]);
  const [emblaRefBottom] = useEmblaCarousel(options, [
    Autoplay(autoPlayOptions),
  ]);

  return (
    <div className="gallery">
      <div className="gallery__top" ref={emblaRefTop}>
        <div className="gallery__container">
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={320}
              style={{ width: 'auto' }}
            />
          </div>
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={120}
            />
          </div>
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={420}
            />
          </div>{' '}
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={420}
            />
          </div>{' '}
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={420}
            />
          </div>{' '}
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={420}
            />
          </div>
        </div>
      </div>
      <div className="gallery__bottom" ref={emblaRefBottom}>
        <div className="gallery__container">
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={420}
            />
          </div>
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={420}
            />
          </div>{' '}
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={420}
            />
          </div>
          <div className="gallery__slide">
            <ImageModal
              src="/island_promo_1.jpeg"
              alt="island"
              height={320}
              width={420}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
