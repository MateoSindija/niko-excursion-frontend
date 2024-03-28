'use server';
import { doc, getFirestore, updateDoc } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { IExcursion } from '@/interfaces/excursion.model';
import getExcursions from '@/app/api/database/getExcursions';
import blockSelectedHours from '@/app/api/database/blockSelectedHours';
import getRequestedExcursions from '@/app/api/database/getRequestedExcursions';
import formatDate from '@/app/utils/formatDate';
import { revalidatePath } from 'next/cache';

const db = getFirestore(initializeApp(firebaseConfig));

const handleExcursionRequest = async (
  confirmed: boolean,
  requestId: string,
  excursionId: string,
) => {
  const excursions: IExcursion[] | undefined = await getExcursions({
    id: excursionId,
  });
  const excursionsRequests = await getRequestedExcursions({
    requestId: requestId,
  });
  const excursionsRequest = excursionsRequests[0];
  const excursion = excursions[0];
  const formattedDate = formatDate(
    excursionsRequest.date.nanoseconds,
    excursionsRequest.date.seconds,
    false,
  );
  let dateParts = formattedDate.split('/');
  const excursionRequestDate = new Date(
    dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0],
  );
  const requestedExcursionRef = doc(db, 'RequestedExcursion', requestId);

  let hours: number[] = [];
  for (let i = 0; i < excursion.duration; i++) {
    hours.push(excursionsRequest.departureHour + i);
  }
  if (confirmed) {
    await blockSelectedHours(excursionRequestDate, [...hours], false);
    await updateDoc(requestedExcursionRef, {
      isApproved: 'confirmed',
    });
  } else {
    if (excursionsRequest.isApproved === 'confirmed') {
      await blockSelectedHours(excursionRequestDate, [...hours], true);
    }
    await updateDoc(requestedExcursionRef, {
      isApproved: 'refused',
    });
  }
  revalidatePath('/admin/requested-excursions', 'page');
};

export default handleExcursionRequest;
