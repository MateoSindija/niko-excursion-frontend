import React from 'react';

interface IProps {
  name: string;
  message: string | undefined;
  excursionName: string;
  date: Date;
  email: string;
  passengerNumber: number;
  phone: string;
  hour: number;
}

const ExcursionScheduleEmail = ({
  name,
  message,
  excursionName,
  date,
  email,
  passengerNumber,
  phone,
  hour,
}: IProps) => {
  return (
    <div>
      <h2>Upit za rezervaciju eskurzije od {name}</h2>
      <div>
        <div>
          <h3>Datum željene rezervacije:</h3>{' '}
          {date.toLocaleString('hr-HR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
        <div>
          <h3>Vrsta eskurzije:</h3> {excursionName}
        </div>
        <div>
          <h3>Vrijeme polaska:</h3> {hour}
        </div>
        <div>
          <h3>Broj putnika:</h3> {passengerNumber}
        </div>
        <div>
          <h3>Email za kontakt:</h3> {email}
        </div>
        <div>
          <h3>Broj mobitela za kontakt:</h3> {phone}
        </div>
        <div>
          <h3>Posebne napomene:</h3> {message}
        </div>
      </div>
    </div>
  );
};

export default ExcursionScheduleEmail;
