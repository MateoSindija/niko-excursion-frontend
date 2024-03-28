import {
  collection,
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
import { IExcursion } from '@/interfaces/excursion.model';

const getDocumentsWithoutGivenId = async (
  idToExclude: string,
): Promise<IExcursion[] | []> => {
  const db = getFirestore(initializeApp(firebaseConfig));
  const collectionRef = await collection(db, 'Excursion');
  const docs = await getDocs(
    query(collectionRef, where(documentId(), '!=', idToExclude), limit(3)),
  );
  if (docs.docs !== undefined) {
    return docs.docs.map((doc) => {
      return JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }));
    });
  }
  return [];
};

export default getDocumentsWithoutGivenId;
