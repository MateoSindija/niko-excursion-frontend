'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay';
import ImageModal from '@/app/components/Modals/ImageModal';

const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 320;

const autoPlayOptions = { stopOnInteraction: false };
const options: EmblaOptionsType = { align: 'start', loop: false };
const Gallery = () => {
  const [emblaRefTop] = useEmblaCarousel(options, [Autoplay(autoPlayOptions)]);
  const [emblaRefBottom] = useEmblaCarousel(options, [
    Autoplay(autoPlayOptions),
  ]);

  const topRow = [
    '/gallery/IMG-20230820-WA0001.jpg',
    '/gallery/IMG-20230820-WA0002.jpg',
    '/gallery/IMG-20230820-WA0004.jpg',
    '/gallery/Otok-Ugljan-605c97b238584838823056_huge.jpg',
    '/gallery/036-min.jpg',
    '/gallery/035-min.jpg',
  ];
  const bottomRow = [
    '/gallery/Screenshot_20240309_084249_Photos (1).jpg',
    '/gallery/034-min.jpg',
    '/gallery/Screenshot_20240309_084253_Photos (1).jpg',
    '/gallery/033-min.jpg',
    '/gallery/038-min.jpg',
    '/gallery/037-min.jpg',
  ];
  return (
    <div className="gallery">
      <div className="gallery__top" ref={emblaRefTop}>
        <div className="gallery__container">
          {topRow.map((src) => {
            return (
              <div className="gallery__slide" key={src}>
                <ImageModal
                  src={src}
                  alt="island"
                  height={IMAGE_HEIGHT}
                  width={IMAGE_WIDTH}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="gallery__bottom" ref={emblaRefBottom}>
        <div className="gallery__container">
          {bottomRow.map((src) => {
            return (
              <div className="gallery__slide" key={src}>
                <ImageModal
                  src={src}
                  alt="island"
                  height={IMAGE_HEIGHT}
                  width={IMAGE_WIDTH}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
