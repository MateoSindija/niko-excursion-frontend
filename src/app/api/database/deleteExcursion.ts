'use server';
import React from 'react';
import { deleteDoc, doc, getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
const db = getFirestore(initializeApp(firebaseConfig));
const deleteExcursion = async (id: string) => {
  await deleteDoc(doc(db, 'Excursion', id));
  return true;
};
