import {
  collection,
  doc,
  DocumentSnapshot,
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
  where,
} from '@firebase/firestore';
import app, { firebaseConfig } from '@/firebase/config';
import { IExcursionRequest } from '@/interfaces/excursion.model';

interface IParams {
  perPage?: number;
  requestId?: string;
  lastDocId?: string;
}

const DOC_LIMIT = 10;

const getRequestedExcursions = async ({
  requestId,
  perPage,
  lastDocId,
}: IParams): Promise<IExcursionRequest[]> => {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'RequestedExcursion');
  if (requestId) {
    const docRef = doc(db, 'RequestedExcursion', requestId);
    const query = await getDoc(docRef);
    if (query.data() !== undefined) {
      const data = JSON.parse(JSON.stringify(query.data()));
      return [{ ...data, requestId: query.id }];
    }
    return [];
  } else {
    let lastDocSnap: DocumentSnapshot | null = null;
    if (lastDocId) {
      lastDocSnap = await getDoc(doc(db, 'RequestedExcursion', lastDocId));
    }
    const data = await getDocs(
      lastDocSnap
        ? query(
            collectionRef,
            where('date', '>=', new Date(Date.now() - 24 * 60 * 60 * 1000)),
            orderBy('date', 'asc'),
            orderBy('isApproved', 'desc'),
            startAfter(lastDocSnap),
            limit(DOC_LIMIT),
          )
        : query(
            collectionRef,
            where('date', '>=', new Date(Date.now() - 24 * 60 * 60 * 1000)),
            orderBy('date', 'asc'),
            orderBy('isApproved', 'desc'),
            limit(DOC_LIMIT),
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
