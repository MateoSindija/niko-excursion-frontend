import React from 'react';
import ArrowIcon from '@/app/utils/vectors/ArrowIcon';
import { Style } from 'util';

interface IProps {
  onClick: (event: React.MouseEvent) => void;
  direction: 'next' | 'previous';
  background: 'white' | 'transparent';
  disabled?: boolean;
  className?: string;
  size?: number;
  buttonStyle?: React.CSSProperties;
}
const CarouselControllerButton = ({
  onClick,
  direction,
  background,
  className,
  size = 70,
  buttonStyle,
  disabled = false,
}: IProps) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
  };
  const arrowSize = size / 3;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...style, ...buttonStyle }}
      className={`${className} carouselButton ${
        background === 'white'
          ? 'carouselButton--white'
          : 'carouselButton--transparent'
      }`}
    >
      {direction === 'next' ? (
        <ArrowIcon direction="next" size={arrowSize} />
      ) : (
        <ArrowIcon direction="previous" size={arrowSize} />
      )}
    </button>
  );
};

export default CarouselControllerButton;
