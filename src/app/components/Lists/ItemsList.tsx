'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ArrowIcon from '@/app/utils/vectors/ArrowIcon';

interface IProps {
  itemsList: [{ title: string; desc: string }];
}

const ItemsList = (props: IProps) => {
  const [activeItems, setActiveItems] = useState<number[] | undefined>([]);
  const { itemsList } = props;
  const handleClick = (index: number) => {
    if (activeItems?.includes(index)) {
      setActiveItems(
        (prevState) => prevState?.filter((items) => items !== index),
      );
    } else {
      setActiveItems((prevState) => [...(activeItems ?? []), index]);
    }
  };
  return (
    <div className="itemList">
      {itemsList.map((item: { title: string; desc: string }, index: number) => {
        return (
          <div key={index} className="itemList__item">
            <button
              className="itemList__item__header"
              onClick={() => handleClick(index)}
            >
              <div className="itemList__item__header__content">
                <Image
                  src={'/check_circle.svg'}
                  alt={'check'}
                  width={30}
                  height={30}
                  className="itemList__item__header__content__image"
                />
                <div className="itemList__item__header__content__text">
                  {item.title}
                </div>
              </div>
              {activeItems?.includes(index) ? (
                <ArrowIcon direction={'up'} color={'black'} />
              ) : (
                <ArrowIcon direction={'down'} color={'black'} />
              )}
            </button>
            {activeItems?.includes(index) && (
              <div className="itemList__item__desc">{item.desc}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItemsList;
