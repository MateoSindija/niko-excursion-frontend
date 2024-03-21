'use server';
import { IExcursion } from '@/interfaces/excursion.model';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

const getMostExpensiveExcursions = async (
  amount: number = 3,
): Promise<IExcursion[] | []> => {
  const db = getFirestore(initializeApp(firebaseConfig));
  const collectionRef = await collection(db, 'Excursion');
  const docs = await getDocs(
    query(collectionRef, orderBy('price', 'desc'), limit(amount)),
  );
  if (docs.docs !== undefined) {
    return docs.docs.map((doc) => {
      return JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }));
    });
  }
  return [];
};

export default getMostExpensiveExcursions;
