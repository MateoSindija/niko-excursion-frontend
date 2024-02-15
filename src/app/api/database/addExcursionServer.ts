'use server';

import imagesUpload from '@/firebase/storageUpload';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

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
  const imagesFiles: File[] = getImagesFromFormData(imagesFormData, 'images');
  if (imagesFiles.length === 0) return new Error('File list empty');
  const urlArray: string[] = await imagesUpload(imagesFiles);

  if (urlArray.length) {
    try {
      const title = formData.get('title');
      const duration = formData.get('duration');
      const descCro = formData.get('descCro');
      const descEng = formData.get('descEng');
      const docRef = await addDoc(collection(db, 'Excursion'), {
        title: title !== null ? title.toString() : '',
        images: urlArray,
        duration: duration !== null ? parseInt(duration.toString()) : 1,
        descriptionCro: descCro !== null ? descCro.toString() : '',
        descriptionEng: descEng !== null ? descEng.toString() : '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return !!docRef.id;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}
