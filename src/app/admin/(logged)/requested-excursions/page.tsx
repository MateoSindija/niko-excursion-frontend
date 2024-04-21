import React from 'react';
import getRequestedExcursions from '@/app/api/database/getRequestedExcursions';
import ExcursionsRequestsList from '@/app/components/Lists/ExcursionsRequestsList';

const getData = async (lastDocId?: string) => {
  'use server';
  if (lastDocId) {
    return await getRequestedExcursions({ lastDocId: lastDocId });
  }
  return await getRequestedExcursions({});
};
const Page = async () => {
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
