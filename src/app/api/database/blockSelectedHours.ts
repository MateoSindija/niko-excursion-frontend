'use server';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

const blockSelectedHours = async (
  date: Date,
  hour: number | number[],
  isAlreadyAdded: boolean,
) => {
  const db = getFirestore(initializeApp(firebaseConfig));
  const dateRef = doc(db, 'ReservedDates', date.toDateString());
  if (typeof hour === 'number') {
    await setDoc(
      dateRef,
      {
        hours: isAlreadyAdded ? arrayRemove(hour) : arrayUnion(hour),
      },
      {
        merge: true,
      },
    );
  } else {
    await setDoc(
      dateRef,
      {
        hours: isAlreadyAdded ? arrayRemove(...hour) : arrayUnion(...hour),
      },
      {
        merge: true,
      },
    );
  }
  return true;
};

export default blockSelectedHours;
