import React from 'react';
import getRequestedExcursions from '@/app/api/database/getRequestedExcursions';
import formatDate from '@/app/utils/formatDate';
import ConfirmModal from '@/app/components/Modals/ConfirmModal';
import ExcursionRequestItem from '@/app/components/Lists/ExcursionRequestItem';
import { collection, getCountFromServer } from '@firebase/firestore';
import getCollectionCount from '@/app/api/database/getCollectionCount';
import PaginationControl from '@/app/components/PaginationControl/PaginationControl';

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams['page'] ?? '1';
  const perPage = searchParams['per_page'] ?? '5';
  const requestedExcursions = await getRequestedExcursions({
    perPage: Number(perPage),
    page: Number(page),
  });
  const docCount = await getCollectionCount('RequestedExcursion');

  return (
    <div className="excursionsPage">
      <div className="excursionsPage__request">
        {requestedExcursions.map((excursionRequest) => {
          return (
            <ExcursionRequestItem
              {...excursionRequest}
              key={excursionRequest.requestId}
            />
          );
        })}
      </div>
      <PaginationControl
        page={Number(page)}
        perPage={Number(perPage)}
        count={docCount}
      />
    </div>
  );
};
export default Page;
