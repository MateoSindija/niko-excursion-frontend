import React from 'react';
import Image from 'next/image';

interface IProps {
  children: React.JSX.Element;
  title: string;
}
const SecondaryPagesContainer = ({ children, title }: IProps) => {
  return (
    <div className="pageContainer">
      <div className="pageContainer__banner">
        <h1 className="pageContainer__banner__title">{title}</h1>
        <Image src="/boat-cropped.jpg" fill alt="boat" priority />
      </div>
      <div className="pageContainer__content">{children}</div>
    </div>
  );
};

export default SecondaryPagesContainer;
