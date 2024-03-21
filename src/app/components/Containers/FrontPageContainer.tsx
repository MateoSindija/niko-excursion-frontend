'use server';
import React, { ReactNode } from 'react';
import Image from 'next/image';

interface IProps {
  children: ReactNode;
  title: string;
  titleColor: 'black' | 'white';
  backgroundColor: 'blue' | 'grey';
}
const FrontPageContainer = ({
  children,
  titleColor,
  title,
  backgroundColor,
}: IProps) => {
  const titleSplitted = title.split(' ');
  const titleLastPart = titleSplitted[titleSplitted.length - 1];
  const titleFirstPart = titleSplitted.slice(0, -1);

  return (
    <div
      className="wrapper"
      style={{
        backgroundColor: backgroundColor === 'grey' ? '#F0F3F7' : '#061138',
      }}
    >
      <div className="wrapper__header">
        <div className="wrapper__header__title" style={{ color: titleColor }}>
          <span className="wrapper__header__title__first">
            {titleFirstPart.map((item, index) => (
              <span key={index}>{item + ' '}</span>
            ))}
          </span>
          <span className="wrapper__header__title__last">{titleLastPart}</span>
        </div>
        <Image
          src="/separator.svg"
          alt="separator"
          width="70"
          height="6"
          priority
        />
      </div>
      {children}
    </div>
  );
};

export default FrontPageContainer;
