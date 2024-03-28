'use server';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { IExcursion } from '@/interfaces/excursion.model';
import { ca } from 'date-fns/locale';

const getExcursions = async (props?: {
  id?: string | null;
  type?: 'private' | 'public';
}): Promise<IExcursion[] | []> => {
  const db = getFirestore(initializeApp(firebaseConfig));
  const { id, type } = props ?? {};

  try {
    if (!id) {
      const collectionRef = collection(db, 'Excursion');
      const data = await getDocs(
        type === undefined
          ? collectionRef
          : query(
              collectionRef,
              where('isExcursionPublic', '==', type === 'private'),
            ),
      );
      return data.docs.map((doc) => {
        return JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }));
      });
    } else {
      const ref = doc(db, 'Excursion', id);
      const query = await getDoc(ref);
      if (query.data() !== undefined) {
        const data = JSON.parse(JSON.stringify(query.data()));
        return [{ ...data, id: query.id }];
      }
      return [];
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getExcursions;
