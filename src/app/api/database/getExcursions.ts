'use server';
import { collection, getDocs, getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

const getExcursions = async () => {
  const db = getFirestore(initializeApp(firebaseConfig));
  const query = await getDocs(collection(db, 'Excursion'));

  return query.docs.map((doc) => {
    return JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }));
  });
};

export default getExcursions;
