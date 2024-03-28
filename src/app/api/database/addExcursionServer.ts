'use server';

import imagesUpload from '@/app/api/database/storageUpload';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { revalidatePath } from 'next/cache';
import { contactSchema } from '@/zod/contactSchema';
import { excursionSchema } from '@/zod/excursionSchema';
import handleTitleImage from '@/app/utils/handleTitleImage';

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(initializeApp(firebaseConfig));

function getImagesFromFormData(formData: FormData, key: string): File[] {
  const images: File[] = [];

  // Iterate through all entries in the FormData
  formData.forEach((value, name) => {
    // Check if the current entry matches the specified key
    if (name.startsWith(`${key}[`) && value instanceof File) {
      images.push(value);
    }
  });

  return images;
}

export default async function addExcursionServer(
  formData: FormData,
  imagesFormData: FormData,
) {
  const titleHr = formData.get('titleHr');
  const titleEn = formData.get('titleEn');
  const duration = formData.get('duration');
  const descCro = formData.get('descCro');
  const descEng = formData.get('descEng');
  const price = formData.get('price');
  const maxPersons = formData.get('maxPersons');
  const titleImage = formData.get('titleImage');
  const isExcursionPublic = formData.get('isExcursionPublic');
  let startingHours: string | undefined = JSON.parse(
    formData.get('startingHours')?.toString() ?? '',
  ).map((x: string) => {
    return parseInt(x);
  });

  const validatedFields = excursionSchema.safeParse({
    titleHr: titleHr,
    titleEn: titleEn,
    duration: duration,
    descCro: descCro,
    descEng: descEng,
    price: price,
    maxPersons: maxPersons,
    titleImage: titleImage,
    hours: startingHours,
    isExcursionPublic: isExcursionPublic,
  });

  if (!validatedFields.success) {
    return false;
  }

  const imagesFiles: File[] = getImagesFromFormData(imagesFormData, 'images');
  if (imagesFiles.length === 0) return false;
  const urlArray: string[] = await imagesUpload(imagesFiles);

  if (urlArray.length) {
    try {
      const docRef = await addDoc(collection(db, 'Excursion'), {
        titleHr: validatedFields.data.titleHr,
        titleEn: validatedFields.data.titleEn,
        images: urlArray,
        duration: validatedFields.data.duration,
        descriptionCro: validatedFields.data.descCro,
        descriptionEng: validatedFields.data.descEng,
        price: validatedFields.data.price,
        maxPersons: validatedFields.data.maxPersons,
        titleImage: handleTitleImage(urlArray, validatedFields.data.titleImage),
        createdAt: new Date(),
        updatedAt: new Date(),
        hours: validatedFields.data.hours,
        isExcursionPublic: validatedFields.data.isExcursionPublic,
      });
      revalidatePath('/admin/new-excursion/[[...id]]', 'page');
      return !!docRef.id;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}
