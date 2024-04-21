import React, { useContext } from 'react';
import getRequestedExcursions from '@/app/api/database/getRequestedExcursions';
import formatDate from '@/app/utils/formatDate';
import ConfirmModal from '@/app/components/Modals/ConfirmModal';
import ExcursionRequestItem from '@/app/components/Lists/ExcursionRequestItem';
import { collection, getCountFromServer } from '@firebase/firestore';
import getCollectionCount from '@/app/api/database/getCollectionCount';
import PaginationControl from '@/app/components/PaginationControl/PaginationControl';
import { IExcursion, IExcursionRequest } from '@/interfaces/excursion.model';
import ExcursionsRequestsList from '@/app/components/Lists/ExcursionsRequestsList';

const getData = async (lastDocId?: string) => {
  'use server';
  if (lastDocId) {
    return await getRequestedExcursions({ lastDocId: lastDocId });
  }
  return await getRequestedExcursions({});
};
const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const requestedExcursions = await getData();

  return (
    <div className="excursionsPage">
      <div className="excursionsPage__request">
        <ExcursionsRequestsList
          initialData={requestedExcursions}
          loadNext={getData}
        />
      </div>
    </div>
  );
};
export default Page;
