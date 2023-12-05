import React from 'react';
interface IProps {
  color?: string;
  size?: number;
}
const MailIcon = ({ color = '#D5AE82', size = 20 }: IProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 18.75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M2.34375 0C1.0498 0 0 1.0498 0 2.34375C0 3.08105 0.34668 3.77441 0.9375 4.21875L11.5625 12.1875C12.1191 12.6025 12.8809 12.6025 13.4375 12.1875L24.0625 4.21875C24.6533 3.77441 25 3.08105 25 2.34375C25 1.0498 23.9502 0 22.6562 0H2.34375ZM0 5.46875V15.625C0 17.3486 1.40137 18.75 3.125 18.75H21.875C23.5986 18.75 25 17.3486 25 15.625V5.46875L14.375 13.4375C13.2617 14.2725 11.7383 14.2725 10.625 13.4375L0 5.46875Z"
        fill={color}
      />
    </svg>
  );
};

export default MailIcon;
