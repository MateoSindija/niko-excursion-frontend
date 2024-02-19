'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { contactSchema } from '@/zod/contactSchema';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import sendEmail from '@/app/api/resend/sendEmail';
import { getValue } from '@firebase/remote-config';

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
  emailFailed: string;
  emailSuccess: string;
}
interface IProps {
  text: IContactForm;
}
type FormData = z.infer<typeof contactSchema>;

const ContactForm = ({ text }: IProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>();

  const {
    reset,
    getValues,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });
  const [splittedTitle] = useState(text.title.split(' '));

  const onSubmit = async () => {
    const result = await sendEmail(
      getValues('email'),
      getValues('message'),
      getValues('name'),
    );

    if (typeof result === 'string') {
      reset();
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

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
              disabled={isSubmitting}
              {...register('name', { required: true })}
              type="text"
              id="name"
              placeholder={text.namePlaceholder}
            />
            {errors?.name && (
              <div className="contactForm__inputs__inputContainer__error">
                {errors?.name?.message}
              </div>
            )}
          </div>
          <div className="contactForm__inputs__inputContainer">
            <label htmlFor="email">{text.emailLabel}</label>
            <input
              disabled={isSubmitting}
              {...register('email', { required: true })}
              type="text"
              placeholder={text.emailPlaceholder}
            />
            {errors?.email && (
              <div className="contactForm__inputs__inputContainer__error">
                {errors?.email?.message}
              </div>
            )}
          </div>
        </div>
        <div className="contactForm__inputs__inputContainer">
          <label htmlFor="message">{text.messageLabel}</label>
          <textarea
            disabled={isSubmitting}
            {...register('message', { required: true })}
            name="message"
            id="message"
            placeholder={text.messagePlaceholder}
          />
          {errors?.message && (
            <div className="contactForm__inputs__inputContainer__error">
              {errors?.message?.message}
            </div>
          )}
        </div>
        <button
          className="contactForm__button"
          type="submit"
          disabled={isSubmitting}
        >
          {text.button}
        </button>
        {isSuccess !== undefined ? (
          isSuccess ? (
            <div>{text.emailSuccess}</div>
          ) : (
            <div>{text.emailFailed}</div>
          )
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
