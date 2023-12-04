import React from 'react';
import Arrow from '@/app/utils/vectors/Arrow';
import { Style } from 'util';

interface IProps {
  onClick: (event: React.MouseEvent) => void;
  direction: 'next' | 'previous';
  background: 'white' | 'transparent';
  className?: string;
  size?: number;
}
const CarouselControllerButton = ({
  onClick,
  direction,
  background,
  className,
  size = 70,
}: IProps) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
  };
  const arrowSize = size / 3;
  return (
    <button
      onClick={onClick}
      style={style}
      className={`${className} carouselButton ${
        background === 'white'
          ? 'carouselButton--white'
          : 'carouselButton--transparent'
      }`}
    >
      {direction === 'next' ? (
        <Arrow direction="next" size={arrowSize} />
      ) : (
        <Arrow direction="previous" size={arrowSize} />
      )}
    </button>
  );
};

export default CarouselControllerButton;
