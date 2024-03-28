'use server';

import {
  collection,
  doc,
  endAt,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { IExcursionRequest } from '@/interfaces/excursion.model';

interface IParams {
  perPage?: number;
  page?: number;
  requestId?: string;
}

const getRequestedExcursions = async ({
  requestId,
  page,
  perPage,
}: IParams): Promise<IExcursionRequest[]> => {
  const db = getFirestore(initializeApp(firebaseConfig));
  const collectionRef = collection(db, 'RequestedExcursion');
  if (requestId) {
    const docRef = doc(db, 'RequestedExcursion', requestId);
    const query = await getDoc(docRef);
    if (query.data() !== undefined) {
      const data = JSON.parse(JSON.stringify(query.data()));
      return [{ ...data, requestId: query.id }];
    }
    return [];
  } else if (perPage != null && page != null) {
    const start = (page - 1) * perPage;

    const data = await getDocs(
      query(
        collectionRef,
        orderBy('isApproved', 'desc'),
        startAt(start),
        limit(perPage),
      ),
    );

    if (data.docs !== undefined) {
      return data.docs.map((doc) => {
        return JSON.parse(JSON.stringify({ ...doc.data(), requestId: doc.id }));
      });
    }
  }
  return [];
};

export default getRequestedExcursions;
