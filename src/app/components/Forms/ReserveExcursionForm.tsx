'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import excursions from '@/app/components/Carousels/ExcursionsCarousel/ExcursionsCarousel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/zod/loginSchema';
import * as z from 'zod';
import { excursionReserveSchema } from '@/zod/excursionSchema';

interface IProps {
  price: number;
  maxPassengers: number;
  text: {
    price: string;
    title: string;
    name: string;
    phone: string;

    email: string;
    date: string;
    passengers: string;
    button: string;
  };
}

type FormData = z.infer<typeof excursionReserveSchema>;
const ReserveExcursionForm = (props: IProps) => {
  const { maxPassengers, price, text } = props;
  const personsNumberArray = Array.from(
    { length: maxPassengers },
    (v, k) => k + 1,
  );
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(excursionReserveSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const sendRequest = async () => {};

  return (
    <form className="reserveForm" onSubmit={handleSubmit(sendRequest)}>
      <div className="reserveForm__price">
        <Image
          src={'/money_icon.svg'}
          alt={'money'}
          width={50}
          height={50}
          className="reserveForm__price__image"
        />
        <div className="reserveForm__price__info">
          <div className="reserveForm__price__info__title">{text.price}</div>
          <div className="reserveForm__price__info__value">{`${price} €`}</div>
        </div>
      </div>

      <span className="reserveForm__title">{text.title}</span>
      <label htmlFor="name">{text.name}</label>
      <input id="name" {...register('name')} />

      <label htmlFor="phone">{text.phone}</label>
      <input id="phone" {...register('phone')} />
      <label htmlFor="email">{text.email}</label>
      <input id="email" {...register('email')} />
      <label htmlFor="datePicker">{text.date}</label>
      <DatePicker
        id={'datePicker'}
        className="reserveForm__datePicker"
        selected={watch('date')}
        onChange={(date) => setValue('date', date ?? new Date())}
        minDate={new Date()}
        startDate={new Date()}
        dateFormat={'dd/MM/YYYY'}
      />
      <label>{text.passengers}</label>
      <select
        id="guestNumber"
        {...register('passengers', { max: maxPassengers })}
      >
        {personsNumberArray.map((number) => {
          return (
            <option value={number} key={number}>
              {number}
            </option>
          );
        })}
        <option></option>
      </select>
      <button className="reserveForm__button">{text.button}</button>
    </form>
  );
};
export default ReserveExcursionForm;
