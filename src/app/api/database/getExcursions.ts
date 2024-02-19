'use server';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

const getExcursions = async (id?: string | null): Promise<IExcursion[]> => {
  const db = getFirestore(initializeApp(firebaseConfig));
  if (!id) {
    const query = await getDocs(collection(db, 'Excursion', id ?? ''));
    return query.docs.map((doc) => {
      return JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }));
    });
  } else {
    const ref = doc(db, 'Excursion', id);
    const query = await getDoc(ref);
    const data = JSON.parse(JSON.stringify(query.data()));
    return [{ ...data, id: query.id }];
  }
};

export default getExcursions;
