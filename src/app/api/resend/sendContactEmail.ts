'use server';
import { Resend } from 'resend';
import { EMAIL } from '@/constants/contact';
import Server from 'next/server';
import { contactSchema } from '@/zod/contactSchema';

const resend = new Resend(process.env.RESEND_KEY);
const sendContactEmail = async (
  email: string,
  message: string,
  name: string,
) => {
  const validatedFields = contactSchema.safeParse({
    email: email,
    message: message,
    name: name,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: EMAIL,
    subject: `Pitanje od ${name}`,
    html: `<p><h2>Pitanje od ${name}</h2></p><p>${message}</p><p>Email adresa za odgovor ${email}</p>`,
  });

  if (data?.id) {
    return data.id;
  } else if (error) {
    return error.message;
  }
};
export default sendContactEmail;
