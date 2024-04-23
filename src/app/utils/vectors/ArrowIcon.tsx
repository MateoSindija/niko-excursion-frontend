import React from 'react';

interface IProps {
  color?: string;
  direction: 'next' | 'previous' | 'up' | 'down';
  size?: number;
}

const ArrowIcon = ({ color = '#ACB7C6', direction, size = 20 }: IProps) => {
  const handleDirection = () => {
    switch (direction) {
      case 'previous':
        return 'rotate(180)';
      case 'down':
        return 'rotate(90)';
      case 'next':
        return '';
      case 'up':
        return 'rotate(270)';
    }
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={handleDirection()}
      style={{ transition: 'all 300ms linear' }}
    >
      <path
        d="M1.16667 19.75L0 18.5833L8.58333 10L0 1.41667L1.16667 0.25L10.9167 10L1.16667 19.75Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowIcon;
