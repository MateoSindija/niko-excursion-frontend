'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { contactSchema } from '@/zod/contactSchema';
import * as z from 'zod';
import { Locale } from 'i18n.config';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface IContactForm {
  title: string;
  subheading: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  button: string;
}
interface IProps {
  text: IContactForm;
}
type FormData = z.infer<typeof contactSchema>;

const ContactForm = ({ text }: IProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });
  const [splittedTitle] = useState(text.title.split(' '));

  const onSubmit = () => {};

  return (
    <div className="contactForm">
      <div className="contactForm__title">
        <span className="contactForm__title__first">
          {splittedTitle[0] + ' '}
        </span>
        <span className="contactForm__title__rest">
          {splittedTitle.slice(1).join(' ')}
        </span>
        <div className="contactForm__title__subheading">{text.subheading}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contactForm__inputs">
          <div className="contactForm__inputs__inputContainer">
            <label htmlFor="name">{text.nameLabel}</label>
            <input
              {...register('name', { required: true })}
              type="text"
              id="name"
              placeholder={text.namePlaceholder}
            />
            {errors?.name && <div>{errors?.name?.message}</div>}
          </div>
          <div className="contactForm__inputs__inputContainer">
            <label htmlFor="email">{text.emailLabel}</label>
            <input
              {...register('email', { required: true })}
              type="text"
              placeholder={text.emailPlaceholder}
            />
            {errors?.email && <div>{errors?.email?.message}</div>}
          </div>
        </div>
        <div className="contactForm__inputs__inputContainer">
          <label htmlFor="message">{text.messageLabel}</label>
          <textarea
            {...register('message', { required: true })}
            name="message"
            id="message"
            placeholder={text.messagePlaceholder}
          />
          {errors?.message && <div>{errors?.message?.message}</div>}
        </div>
        <button className="contactForm__button" type="submit">
          {text.button}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
