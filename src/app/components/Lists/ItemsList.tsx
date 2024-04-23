'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import ArrowIcon from '@/app/utils/vectors/ArrowIcon';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';

interface IProps {
  itemsList: [{ title: string; desc: string }];
}

const ItemsList = (props: IProps) => {
  const [activeItems, setActiveItems] = useState<number[] | undefined>([]);
  const { itemsList } = props;
  const nodeRef = useRef<Array<null>>(new Array(itemsList.length).fill(null));
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
          <div key={index} className={`itemList__item`}>
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
              <CSSTransition
                in={activeItems?.includes(index)}
                timeout={10}
                classNames="rotate"
              >
                <ArrowIcon
                  direction={activeItems?.includes(index) ? 'up' : 'down'}
                  color={'black'}
                />
              </CSSTransition>
            </button>
            <CSSTransition
              in={activeItems?.includes(index)}
              timeout={300}
              unmountOnExit
              classNames={'slide-down'}
              nodeRef={nodeRef.current[index]}
            >
              <div
                className="itemList__item__desc"
                ref={nodeRef.current[index]}
              >
                {item.desc}
              </div>
            </CSSTransition>
          </div>
        );
      })}
    </div>
  );
};

export default ItemsList;
