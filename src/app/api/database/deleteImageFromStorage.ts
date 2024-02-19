'use server';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { refFromURL } from '@firebase/database';
import firebase from 'firebase/compat/app';
import { revalidatePath } from 'next/cache';
import {
  arrayRemove,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from '@firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(initializeApp(firebaseConfig));
const deleteImage = async (imageUrl: string, docId: string) => {
  const storage = getStorage(app);
  const docRef = doc(db, 'Excursion', docId);
  try {
    await deleteObject(ref(storage, imageUrl));
    await updateDoc(docRef, {
      images: arrayRemove(imageUrl),
    });
    revalidatePath('/admin/new-excursion/[[...id]]', 'page');
    return true;
  } catch (e) {
    return false;
  }
};
export default deleteImage;
