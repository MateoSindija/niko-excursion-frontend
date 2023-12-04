import React from 'react';
interface IProps {
  color?: string;
  size?: number;
}
const Mail = ({ color = '#D5AE82', size = 20 }: IProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M3.34375 4C2.0498 4 1 5.0498 1 6.34375C1 7.08105 1.34668 7.77441 1.9375 8.21875L12.5625 16.1875C13.1191 16.6025 13.8809 16.6025 14.4375 16.1875L25.0625 8.21875C25.6533 7.77441 26 7.08105 26 6.34375C26 5.0498 24.9502 4 23.6562 4H3.34375ZM1 9.46875V19.625C1 21.3486 2.40137 22.75 4.125 22.75H22.875C24.5986 22.75 26 21.3486 26 19.625V9.46875L15.375 17.4375C14.2617 18.2725 12.7383 18.2725 11.625 17.4375L1 9.46875Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_430_58">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Mail;
