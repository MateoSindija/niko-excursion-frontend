import React from 'react';
import Logo from '@/app/components/Logo/Logo';
import LinkList from '@/app/components/Navbar/LinkList';
import SocialMediaButton from '@/app/components/Buttons/SocialMediaButton';
import PhoneIcon from '@/app/utils/vectors/PhoneIcon';
import MailIcon from '@/app/utils/vectors/MailIcon';
import LocationIcon from '@/app/utils/vectors/LocationIcon';
import Image from 'next/image';
import { EMAIL, LOCATION, PHONE_NUMBER } from '@/constants/contact';
import ImageModal from '@/app/components/Modals/ImageModal';

interface IProps {
  lang: string;
  footerDictionary: any | undefined;
}

const Footer = async ({ lang, footerDictionary }: IProps) => {
  return (
    <footer className="footer">
      <div className="footer__col col--md">
        <Logo className="footer__col__title" />
        <div className="footer__col__text">{footerDictionary?.description}</div>
      </div>
      <div className="footer__col col--sm">
        <div className="footer__col__title">{footerDictionary?.overview}</div>
        <LinkList lang={lang} className="footer__col__link" />
      </div>
      <div className="footer__col col--md">
        <div className="footer__col__title">{footerDictionary?.getInTouch}</div>
        <div className="footer__col__row">
          <LocationIcon />
          <span className="footer__col__row__text">{LOCATION}</span>
        </div>
        <div className="footer__col__row">
          <PhoneIcon />
          <a
            className="footer__col__row__text"
            href={`https://wa.me/${PHONE_NUMBER.replace(/[+\s]/g, '')}`}
          >
            {PHONE_NUMBER}
          </a>
        </div>
        <div className="footer__col__row">
          <MailIcon />
          <a className="footer__col__row__text" href={`mailto: ${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
        <div className="footer__col__row">
          <SocialMediaButton
            type="facebook"
            shape="circle"
            background="dark-blue"
            className="footer__col__row__social"
          />
          <SocialMediaButton
            type="instagram"
            shape="circle"
            background="dark-blue"
          />
        </div>
      </div>
      <div className="footer__col col--ig">
        <div className="footer__col__title">Instagram</div>
        <div className="footer__col__photos">
          <div className="footer__col__photos__photo">
            <ImageModal
              src="/instagram/boat.webp"
              alt="boat"
              fill={true}
              sizes="(max-width: 400px) 70px,95px"
            />
          </div>
          <div className="footer__col__photos__photo">
            <ImageModal
              src="/instagram/boat_2.webp"
              alt="boat"
              fill={true}
              sizes="(max-width: 400px) 70px,95px"
            />
          </div>
          <div className="footer__col__photos__photo">
            <ImageModal
              src="/instagram/boat_dock.webp"
              alt="dock"
              fill={true}
              sizes="(max-width: 400px) 70px,95px"
            />
          </div>
          <div className="footer__col__photos__photo">
            <ImageModal
              src="/instagram/clifs.webp"
              alt="clifs"
              fill={true}
              sizes="(max-width: 400px) 70px,95px"
            />
          </div>
          <div className="footer__col__photos__photo">
            <ImageModal
              src="/instagram/dugi_otok.webp"
              alt="dugi"
              fill={true}
              sizes="(max-width: 400px) 70px,95px"
            />
          </div>
          <div className="footer__col__photos__photo">
            <ImageModal
              src="/instagram/kornati.webp"
              alt="kornat"
              fill={true}
              sizes="(max-width: 400px) 70px,95px"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
