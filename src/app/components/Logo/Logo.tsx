import React from 'react';

interface IProps {
  className?: string;
}
const Logo = ({ className = '' }: IProps) => {
  return <div className={className}>Logo</div>;
};

export default Logo;
