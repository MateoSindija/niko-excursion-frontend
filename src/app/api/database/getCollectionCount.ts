'use server';
import {
  collection,
  getCountFromServer,
  getFirestore,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

const getCollectionCount = async (collectionName: string) => {
  const db = getFirestore(initializeApp(firebaseConfig));
  const collectionRef = collection(db, collectionName);
  const snapshotCount = await getCountFromServer(collectionRef);

  return snapshotCount.data().count;
};

export default getCollectionCount;
