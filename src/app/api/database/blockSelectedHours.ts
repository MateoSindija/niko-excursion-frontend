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
import app, { firebaseConfig } from '@/firebase/config';
import addDays from '@/app/utils/addDays';

const blockSelectedHours = async (
  date: Date,
  hour: number | number[],
  isAlreadyAdded: boolean,
  isExcursionPublic: boolean,
) => {
  const db = getFirestore(app);
  const dateRef = doc(db, 'ReservedDates', date.toDateString());
  if (!isExcursionPublic) {
    if (typeof hour === 'number') {
      await setDoc(
        dateRef,
        {
          deletionDate: addDays(date, 2),
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
          deletionDate: addDays(date, 2),
          hours: isAlreadyAdded ? arrayRemove(...hour) : arrayUnion(...hour),
        },
        {
          merge: true,
        },
      );
    }
  }
  return true;
};

export default blockSelectedHours;
