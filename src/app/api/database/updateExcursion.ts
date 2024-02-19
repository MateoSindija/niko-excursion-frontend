'use server';

import imagesUpload from '@/app/api/database/storageUpload';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { revalidatePath } from 'next/cache';
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

export default async function updateExcursion(
  id: string,
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

  const validatedFields = excursionSchema.safeParse({
    titleHr: titleHr,
    titleEn: titleEn,
    duration: duration,
    descCro: descCro,
    descEng: descEng,
    price: price,
    maxPersons: maxPersons,
    titleImage: titleImage,
  });

  if (!validatedFields.success) {
    return false;
  }

  const imagesFiles: File[] = getImagesFromFormData(imagesFormData, 'images');
  let urlArray: string[] = [];
  if (imagesFiles.length !== 0) {
    urlArray = await imagesUpload(imagesFiles);
  }

  try {
    await updateDoc(doc(db, 'Excursion', id), {
      titleHr: validatedFields.data.titleHr,
      titleEn: validatedFields.data.titleEn,
      images: arrayUnion(...urlArray),
      duration: validatedFields.data.duration,
      descriptionCro: validatedFields.data.descCro,
      descriptionEng: validatedFields.data.descEng,
      maxPersons: validatedFields.data.maxPersons,
      price: validatedFields.data.price,
      titleImage: handleTitleImage(urlArray, validatedFields.data.titleImage),
      updatedAt: new Date(),
    });
    revalidatePath('/admin/new-excursion/[[...id]]', 'page');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
