import React from 'react';
interface IProps {
  color?: string;
  size?: number;
}
const Location = ({ color = '#D5AE82', size = 20 }: IProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_430_52)">
        <path
          d="M9.42091 24.4956C1.47492 14.2105 0 13.1549 0 9.375C0 4.19731 4.70099 0 10.5 0C16.299 0 21 4.19731 21 9.375C21 13.1549 19.5251 14.2105 11.5791 24.4956C11.0576 25.1682 9.9423 25.1681 9.42091 24.4956ZM10.5 13.2812C12.9163 13.2812 14.875 11.5324 14.875 9.375C14.875 7.21763 12.9163 5.46875 10.5 5.46875C8.08374 5.46875 6.125 7.21763 6.125 9.375C6.125 11.5324 8.08374 13.2812 10.5 13.2812Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_430_52">
          <rect width="21" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Location;
