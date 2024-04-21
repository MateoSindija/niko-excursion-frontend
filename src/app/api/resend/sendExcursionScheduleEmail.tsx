'use server';
import { Resend } from 'resend';
import { EMAIL } from '@/constants/contact';
import { excursionReserveSchema } from '@/zod/excursionSchema';
import z from 'zod';
import ExcursionScheduleEmail from '@/app/components/EmailTemplates/ExcursionScheduleEmail';
import { render } from '@react-email/render';
import calculatePrice from '@/app/utils/calculatePrice';

const resend = new Resend(process.env.RESEND_KEY);
const sendExcursionScheduleEmail = async (
  email: string,
  message: string | undefined | '',
  name: string,
  date: Date,
  phone: string,
  excursionName: string,
  passengerNumber: number,
  hour: number,
  price: number,
): Promise<boolean> => {
  const validatedFields = excursionReserveSchema.safeParse({
    email: email,
    message: message,
    name: name,
    date: date,
    phone: phone,

    passengers: passengerNumber,
  });

  const excursionNameSchema = z.string().min(3).max(100);
  const excursionHourSchema = z.coerce.number().min(9).max(22);

  if (
    !validatedFields.success ||
    !excursionNameSchema.safeParse(excursionName).success ||
    !excursionHourSchema.safeParse(hour).success
  ) {
    if (!validatedFields.success) return false;
  }
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: EMAIL,
    subject: `Upit za rezervaciju eskurzije ${excursionName} od ${name}`,
    html: render(
      <ExcursionScheduleEmail
        name={name}
        message={message}
        excursionName={excursionName}
        date={date}
        email={email}
        passengerNumber={passengerNumber}
        phone={phone}
        hour={hour}
        price={price}
      />,
      { pretty: true },
    ),
  });
  if (data?.id) {
    return true;
  } else if (error) {
    return false;
  }
  return false;
};
export default sendExcursionScheduleEmail;
