import { initializeApp } from 'firebase/app';
import app, { auth, firebaseConfig } from '@/firebase/config';
import { refFromURL } from '@firebase/database';
import firebase from 'firebase/compat/app';
import { revalidatePath } from 'next/cache';
import { arrayRemove, doc, getFirestore, updateDoc } from '@firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const db = getFirestore(app);
const deleteImage = async (imageUrl: string, docId: string) => {
  const storage = getStorage(app);
  const docRef = doc(db, 'Excursion', docId);
  try {
    await deleteObject(ref(storage, imageUrl));
    await updateDoc(docRef, {
      images: arrayRemove(imageUrl),
    });
    // revalidatePath('/admin/new-excursion/[[...id]]', 'page');
    return true;
  } catch (e) {
    return false;
  }
};
export default deleteImage;
