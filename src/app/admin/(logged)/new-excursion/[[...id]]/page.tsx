import React, { useContext } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import Link from 'next/link';
import ExcursionForm from '@/app/components/Forms/ExcursionForm';
import getExcursions from '@/app/api/database/getExcursions';
import { IExcursion } from '@/interfaces/excursion.model';
import { AuthContext } from '@/app/utils/AuthProvider';

const Page = async ({
  params,
}: {
  params: {
    id: string[] | undefined;
  };
}) => {
  let excursion: IExcursion[] = [];
  if (params.id) {
    excursion = await getExcursions({ id: params.id[0] });
  }

  return (
    <div className="excursionsPage">
      <ExcursionForm {...excursion[0]} />
    </div>
  );
};

export default Page;
