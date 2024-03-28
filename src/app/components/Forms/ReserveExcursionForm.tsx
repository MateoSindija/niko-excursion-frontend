'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import excursions from '@/app/components/Carousels/ExcursionsCarousel/ExcursionsCarousel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/zod/loginSchema';
import * as z from 'zod';
import { excursionReserveSchema } from '@/zod/excursionSchema';
import sendExcursionScheduleEmail from '@/app/api/resend/sendExcursionScheduleEmail';
import { useGetBlockedHours } from '@/hooks/useGetBlockedHours';
import HourButton from '@/app/components/Buttons/HourButton';
import addExcursionRequest from '@/app/api/database/addExcursionRequest';
import { da } from 'date-fns/locale';

interface IProps {
  price: number;
  maxPassengers: number;
  excursionName: string;
  id: string;
  text: {
    price: string;
    title: string;
    name: string;
    phone: string;
    message: string;
    email: string;
    date: string;
    passengers: string;
    button: string;
    chooseTime: string;
    noAvailableTime: string;
    error: string;
    success: {
      message: string;
    };
  };
  isExcursionPublic: boolean;
  excursionStartingHours: number[] | undefined;
}

type FormData = z.infer<typeof excursionReserveSchema>;
const ReserveExcursionForm = (props: IProps) => {
  const {
    maxPassengers,
    price,
    text,
    excursionName,
    isExcursionPublic,
    excursionStartingHours,
    id,
  } = props;
  const workingHours = Array.from(
    { length: 22 - 9 + 1 },
    (_, index) => 9 + index,
  );

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [selectedDepartureHour, setSelectedDepartureHour] = useState<
    number | undefined
  >(undefined);
  const personsNumberArray = Array.from(
    { length: maxPassengers },
    (v, k) => k + 1,
  );
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    resetField,
    clearErrors,
    setError,
    getValues,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(excursionReserveSchema),
    defaultValues: {
      date: new Date(),
      passengers: 1,
    },
  });

  const { isLoading: isHoursLoading, blockedHours } = useGetBlockedHours(
    watch('date'),
  );
  const handleDisabled = () => {
    return isHoursLoading || isSubmitting;
  };

  useEffect(() => {
    setSelectedDepartureHour(undefined);
  }, [watch('date')]);
  const handleHourClick = (hour: number) => {
    clearErrors('root');
    setSelectedDepartureHour(hour);
  };

  const sendRequest = async (data: FormData) => {
    if (!selectedDepartureHour) {
      setError('root.hour', {
        type: 'custom',
        message: 'Select departure hour',
      });
      return;
    }
    const formData = new FormData();
    formData.append('clientName', data.name);
    formData.append('clientEmail', data.email);
    formData.append('clientNumber', data.phone);
    formData.append('passengerNumber', data.passengers.toString());
    formData.append('optionalMessage', data.message ?? '');
    formData.append('departureHour', selectedDepartureHour.toString());

    const status = await addExcursionRequest(
      formData,
      data.date,
      excursionName,
      id,
    );
    if (!status) {
      setError('root.failed', { type: 'custom', message: text.error });
      return;
    }
    const isSuccess = await sendExcursionScheduleEmail(
      data.email,
      data.message,
      data.name,
      data.date,
      data.phone,
      excursionName,
      data.passengers,
      selectedDepartureHour,
    );

    if (isSuccess && status) {
      reset();
      setIsEmailSent(true);
    }
  };
  return (
    <form className="reserveForm" onSubmit={handleSubmit(sendRequest)}>
      {isEmailSent ? (
        <div>{text.success.message}</div>
      ) : (
        <>
          <div className="reserveForm__price">
            <Image
              src={'/money_icon.svg'}
              alt={'money'}
              width={50}
              height={50}
              className="reserveForm__price__image"
            />
            <div className="reserveForm__price__info">
              <div className="reserveForm__price__info__title">
                {text.price}
              </div>
              <div className="reserveForm__price__info__value">{`${price} €`}</div>
            </div>
          </div>

          <span className="reserveForm__title">{text.title}</span>
          <label htmlFor="name">{text.name}</label>
          <input id="name" {...register('name')} disabled={handleDisabled()} />
          {errors.name && (
            <div className="reserveForm__error">{errors.name.message}</div>
          )}

          <label htmlFor="phone">{text.phone}</label>
          <input
            id="phone"
            {...register('phone')}
            disabled={handleDisabled()}
          />
          {errors.phone && (
            <div className="reserveForm__error">{errors.phone.message}</div>
          )}

          <label htmlFor="email">{text.email}</label>
          <input
            id="email"
            {...register('email')}
            disabled={handleDisabled()}
          />
          {errors.email && (
            <div className="reserveForm__error">{errors.email.message}</div>
          )}
          <label htmlFor="datePicker">{text.date}</label>
          <DatePicker
            id={'datePicker'}
            className="reserveForm__datePicker"
            selected={watch('date')}
            onChange={(date) =>
              setValue('date', date ?? new Date('mm/MM/YYYY'))
            }
            minDate={new Date()}
            startDate={new Date()}
            disabled={handleDisabled()}
            dateFormat={'dd/MM/YYYY'}
          />
          {errors.date && (
            <div className="reserveForm__error">{errors.date.message}</div>
          )}
          <label>{text.chooseTime}</label>

          {isExcursionPublic ? (
            <div className="reserveForm__hours">
              {blockedHours.length === workingHours.length ? (
                <div>{text.noAvailableTime}</div>
              ) : (
                excursionStartingHours?.map((hour, index) => {
                  if (!blockedHours.includes(hour)) {
                    return (
                      <HourButton
                        key={index}
                        hour={hour}
                        selectedButton={selectedDepartureHour}
                        handleDisabled={() => handleDisabled()}
                        handleClick={handleHourClick}
                      />
                    );
                  }
                })
              )}
            </div>
          ) : (
            <div className="reserveForm__hours">
              {blockedHours.length === workingHours.length ? (
                <div className="reserveForm__error">{text.noAvailableTime}</div>
              ) : (
                workingHours.map((hour, index) => {
                  if (!blockedHours.includes(hour)) {
                    return (
                      <HourButton
                        key={index}
                        hour={hour}
                        selectedButton={selectedDepartureHour}
                        handleDisabled={() => handleDisabled()}
                        handleClick={handleHourClick}
                      />
                    );
                  }
                })
              )}
            </div>
          )}
          {errors.root && errors.root['hour'] && (
            <div className="reserveForm__error">
              {errors.root['hour'].message}
            </div>
          )}
          <label>{text.passengers}</label>
          <select
            disabled={handleDisabled()}
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
          </select>
          {errors.passengers && (
            <div className="reserveForm__error">
              {errors.passengers.message}
            </div>
          )}
          <label htmlFor="messgae">{text.message}</label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            disabled={handleDisabled()}
          />
          {errors.message && (
            <div className="reserveForm__error">{errors.message.message}</div>
          )}
          <button className="reserveForm__button" disabled={handleDisabled()}>
            {text.button}
          </button>
          {errors.root && errors.root['failed'] && (
            <div className="reserveForm__error">
              {errors.root['failed'].message}
            </div>
          )}
        </>
      )}
    </form>
  );
};
export default ReserveExcursionForm;
