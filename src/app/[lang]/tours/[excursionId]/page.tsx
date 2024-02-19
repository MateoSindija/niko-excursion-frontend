import React from 'react';
import SecondaryPagesContainer from '@/app/components/Containers/SecondaryPagesContainer';

const Page = ({
  params,
}: {
  params: {
    excursionId: string;
  };
}) => {
  return (
    <SecondaryPagesContainer title={'Book your tour'}>
      <div>{params.excursionId}</div>
    </SecondaryPagesContainer>
  );
};

export default Page;
