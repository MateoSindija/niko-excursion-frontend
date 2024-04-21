import {
  collection,
  getCountFromServer,
  getFirestore,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import app, { firebaseConfig } from '@/firebase/config';

const getCollectionCount = async (collectionName: string) => {
  const db = getFirestore(app);
  const collectionRef = collection(db, collectionName);
  const snapshotCount = await getCountFromServer(collectionRef);

  return snapshotCount.data().count;
};

export default getCollectionCount;
