'use server';
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

const db = getFirestore(initializeApp(firebaseConfig));
const getBlockedHoursInDay = async (date: Date) => {
  const docRef = doc(db, 'ReservedDates', date.toDateString());
  const document = await getDoc(docRef);
  if (document.data() !== undefined) {
    return JSON.parse(JSON.stringify({ ...document.data()?.hours }));
  }
  return [];
};

export default getBlockedHoursInDay;
