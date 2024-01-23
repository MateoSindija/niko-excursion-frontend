import React from 'react';
import Image from 'next/image';
import { Locale } from 'i18n.config';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { EMAIL, LOCATION, PHONE_NUMBER } from '@/constants/contact';

interface IContact {
  title: string;
  info: {
    address: string;
    phone: string;
    email: string;
    hours: string;
    callUs: string;
    openFromTo: string;
  };
}
interface IProps {
  type: 'address' | 'phone' | 'email' | 'hours';
  text: IContact;
}
const ICON_SIZE = 50;
const InfoCard = async ({ type, text }: IProps) => {
  const handleIcon = () => {
    switch (type) {
      case 'address':
        return (
          <Image
            src={'/info/address.svg'}
            alt="address"
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        );
      case 'phone':
        return (
          <Image
            src={'/info/phone_chat.svg'}
            alt="phone"
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        );
      case 'hours':
        return (
          <Image
            src={'/info/clock.svg'}
            alt="clock"
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        );
      case 'email':
        return (
          <Image
            src={'/info/email.svg'}
            alt="email"
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        );
    }
  };

  const handleTitle = () => {
    switch (type) {
      case 'address':
        return text.info.address;
      case 'phone':
        return text.info.phone;
      case 'hours':
        return text.info.hours;
      case 'email':
        return text.info.email;
    }
  };

  const handleInfo = () => {
    switch (type) {
      case 'address':
        return LOCATION;
      case 'phone':
        return text.info.callUs + PHONE_NUMBER;
      case 'hours':
        return text.info.openFromTo;
      case 'email':
        return EMAIL;
    }
  };
  return (
    <div className="infoContainer">
      <div className="infoContainer__header">
        {handleIcon()}
        <h4 className="infoContainer__header__title">{handleTitle()}</h4>
      </div>
      <Image src={'/horizontal_line.svg'} alt="line" height={30} width={10} />
      <div className="infoContainer__info">{handleInfo()}</div>
    </div>
  );
};

export default InfoCard;
