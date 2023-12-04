import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  type: 'facebook' | 'instagram';
  shape: 'rectangle' | 'circle';
  className?: string;
  background: 'white' | 'dark-blue';
}
const SocialMediaButton = ({
  type,
  shape,
  background,
  className = '',
}: IProps) => {
  return (
    <Link
      href={
        type === 'facebook'
          ? 'https://www.facebook.com/niko.excursions'
          : 'https://www.instagram.com/niko_excursions/?hl=en'
      }
      target="_blank"
      className={`socialMediaButton ${className}
        ${
          shape === 'rectangle'
            ? 'socialMediaButton--rect'
            : 'socialMediaButton--circle'
        }
    ${
      background === 'white'
        ? 'socialMediaButton--white'
        : 'socialMediaButton--blue'
    }`}
    >
      <Image
        width={20}
        priority={true}
        height={20}
        src={type === 'facebook' ? '/facebook_icon.svg' : '/instagram_icon.svg'}
        alt="icon"
      />
    </Link>
  );
};

export default SocialMediaButton;
