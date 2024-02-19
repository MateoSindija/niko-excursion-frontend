'use server';
import React from 'react';
import { deleteDoc, doc, getDoc, getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
const db = getFirestore(initializeApp(firebaseConfig));
const deleteExcursion = async (id: string) => {
  const docRef = doc(db, 'Excursion', id);
  const storage = getStorage(app);
  const query = await getDoc(docRef);

  if (query.get('images'))
    query.get('images').map(async (image: string) => {
      await deleteObject(ref(storage, image));
    });

  await deleteDoc(doc(db, 'Excursion', id));
};

export default deleteExcursion;
