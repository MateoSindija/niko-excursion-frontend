import { deleteDoc, doc, getFirestore } from '@firebase/firestore';
import app from '@/firebase/config';
import { revalidatePath } from 'next/cache';

const db = getFirestore(app);

const deleteRequestForExcursion = async (requestId: string) => {
  const docRef = doc(db, 'RequestedExcursion', requestId);
  await deleteDoc(docRef);
  // revalidatePath('/admin/requested-excursions', 'page');
};

export default deleteRequestForExcursion;
