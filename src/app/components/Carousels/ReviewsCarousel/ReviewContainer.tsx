import React from 'react';
import Image from 'next/image';

interface IProps {
  userName: string;
  review: string;
  userImg: string;
  starsCount: number;
}

const USER_IMAGE_SIZE = 50;
const STAR_IMAGE_SIZE = 20;
const QUOTATION_IMAGE_SIZE = 30;
const ReviewContainer = ({ userName, review, userImg, starsCount }: IProps) => {
  return (
    <div className="reviewContainer">
      <div className="reviewContainer__stars">
        {[...Array(starsCount)].map((star, index) => {
          return (
            <Image
              key={index}
              src="/star_icon.svg"
              alt="star"
              className="reviewContainer__stars__star"
              width={STAR_IMAGE_SIZE}
              height={STAR_IMAGE_SIZE}
            />
          );
        })}
      </div>
      <div className="reviewContainer__images">
        <Image
          className="reviewContainer__images__user"
          src={userImg}
          alt="user"
          width={USER_IMAGE_SIZE}
          height={USER_IMAGE_SIZE}
        />
        <Image
          src="/quotation_icon.svg"
          alt="quotation"
          width={QUOTATION_IMAGE_SIZE}
          height={QUOTATION_IMAGE_SIZE}
        />
      </div>
      <div className="reviewContainer__text">
        <div className="reviewContainer__text__user">{userName}</div>
        <div className="reviewContainer__text__review">{review}</div>
      </div>
    </div>
  );
};

export default ReviewContainer;
