'use client';
import React, {
  ReactEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import ImageNext, { ImageProps } from 'next/image';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import Link from 'next/link';
import { useDisableBodyScroll } from '@/hooks/useDisableBodyScroll';

interface IProps extends ImageProps {
  srcArray?: Array<string>;
}
const ImageModal = ({ ...props }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useDisableBodyScroll(isOpen);

  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      children: 'a',
      gallery: '#modal',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    lightbox.on('close', () => {
      setIsOpen(false);
    });

    lightbox.on('beforeOpen', () => {
      setIsOpen(true);
    });

    return () => {
      setIsOpen(false);
      lightbox?.destroy();
      lightbox = null;
    };
  }, []);

  useEffect(() => {
    const getImageSize = async () => {
      const img = new Image();
      img.src = props.src.toString();

      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
      };
    };

    getImageSize();
  }, [props.src]);

  return (
    <>
      <div className="pswp-gallery" id="modal">
        <Link
          id="modal"
          href={props.src.toString()}
          data-pswp-width={dimensions.width}
          data-pswp-height={dimensions.height}
          target="_blank"
          rel="noreferrer"
        >
          <ImageNext {...props} />
        </Link>
      </div>
    </>
  );
};

export default ImageModal;
