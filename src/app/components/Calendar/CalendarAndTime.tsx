'use client';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { date } from 'zod';
import blockSelectedHours from '@/app/api/database/blockSelectedHours';
import getBlockedHoursForDay from '@/app/api/database/getBlockedHoursForDay';
import { useGetBlockedHours } from '@/hooks/useGetBlockedHours';
import { getAuth, initializeAuth } from '@firebase/auth';
import app, { auth, firebaseConfig } from '@/firebase/config';
import firebase, { initializeApp } from 'firebase/app';

const CalendarAndTime = () => {
  const hours = Array.from({ length: 20 - 9 + 1 }, (_, index) => 9 + index);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHours, setSelectedHours] = useState<number[]>([]);

  const { isLoading, blockedHours } = useGetBlockedHours(selectedDate);

  useEffect(() => {
    setSelectedHours(blockedHours);
  }, [blockedHours]);

  const handleCalendarClick = (
    value: Date,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedDate(value);
    setSelectedHours([]);
  };

  const handleHourClick = async (hour: number) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours((prevState) =>
        prevState.filter((stateHour) => stateHour !== hour),
      );
      await blockSelectedHours(selectedDate, hour, true);
    } else {
      setSelectedHours((prevState) => [...prevState, hour]);
      await blockSelectedHours(selectedDate, hour, false);
    }
  };
  return (
    <div className="calendarContainer">
      <div className="calendarContainer__hours">
        <div className="calendarContainer__hours__title">
          Odaberite sate koje želite označiti kao zauzete za dan{' '}
          {selectedDate.toLocaleDateString('hr-HR')}
        </div>
        <div className="calendarContainer__hours__buttons">
          {hours.map((hour) => {
            return (
              <button
                disabled={isLoading}
                key={hour}
                onClick={() => handleHourClick(hour)}
                className={`calendarContainer__hours__buttons__btn ${
                  selectedHours.includes(hour) ? 'selectedBtn' : ''
                }`}
              >
                {`${hour}:00h`}
              </button>
            );
          })}
        </div>
      </div>
      <Calendar
        locale={'hr-HR'}
        className="calendarContainer__calendar"
        minDate={new Date()}
        onClickDay={handleCalendarClick}
      />
    </div>
  );
};

export default CalendarAndTime;
