import imagesUpload from '@/app/api/database/storageUpload';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  // getFirestore,
  setDoc,
} from '@firebase/firestore';

import app, { firebaseConfig } from '@/firebase/config';
import { excursionReserveSchema, excursionSchema } from '@/zod/excursionSchema';
import handleTitleImage from '@/app/utils/handleTitleImage';
import z, { boolean } from 'zod';
import getExcursions from '@/app/api/database/getExcursions';
import { IExcursion } from '@/interfaces/excursion.model';
import calculatePrice from '@/app/utils/calculatePrice';

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default async function addExcursionRequest(
  formData: FormData,
  date: Date,
  excursionTitle: string,
  id: string,
) {
  const clientName = formData.get('clientName');
  const clientEmail = formData.get('clientEmail');
  const clientNumber = formData.get('clientNumber');
  const passengerNumber = formData.get('passengerNumber');
  const optionalMessage = formData.get('optionalMessage');
  const departureHour = formData.get('departureHour');

  const validatedFields = excursionReserveSchema.safeParse({
    name: clientName,
    phone: clientNumber,
    message: optionalMessage,
    email: clientEmail,
    date: date,
    passengers: passengerNumber,
  });

  const excursionHourSchema = z.coerce.number().min(9).max(20);
  const validateHour = excursionHourSchema.safeParse(departureHour);

  if (!validatedFields.success || !validateHour.success) {
    return false;
  }

  const excursions: IExcursion[] | undefined = await getExcursions({ id: id });
  const excursion = excursions[0];

  try {
    const docRef = await addDoc(collection(db, 'RequestedExcursion'), {
      clientName: validatedFields.data.name,
      clientEmail: validatedFields.data.email,
      clientNumber: validatedFields.data.phone,
      price: calculatePrice(
        excursion.price,
        excursion.isExcursionPublic,
        validatedFields.data.passengers,
      ),
      passengerNumber: validatedFields.data.passengers,
      date: validatedFields.data.date,
      optionalMessage: validatedFields.data.message,
      departureHour: validateHour.data,
      createdAt: new Date(),
      updatedAt: new Date(),
      isApproved: 'sent',
      excursionTitle: excursionTitle,
      excursionId: id,
    });
    // revalidatePath('/[lang]/tours//[excursionId]', 'page');
    return !!docRef.id;
  } catch (e) {
    console.log(e);
    return false;
  }
}
