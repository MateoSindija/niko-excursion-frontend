import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import Link from 'next/link';
import ExcursionForm from '@/app/components/Forms/ExcursionForm';
import getExcursions from '@/app/api/database/getExcursions';

const Page = async ({
  params,
}: {
  params: {
    id: string[] | undefined;
  };
}) => {
  const session = getServerSession();
  let excursion: IExcursion[] = [];
  if (params.id) {
    excursion = await getExcursions(params.id[0]);
  }

  if (!session) {
    redirect('/admin');
    return null;
  }

  return (
    <div>
      <div className="excursionsPage__nav">
        <Link href="/admin/excursions">
          <button className="excursionsPage__nav__newExcursion" type="submit">
            Lista eskurzija
          </button>
        </Link>
        <Link href="/admin/active-excursions">
          <button className="excursionsPage__nav__newExcursion" type="submit">
            Lista aktivnih eskurzija
          </button>
        </Link>
        <SignOutButton />
      </div>
      <ExcursionForm {...excursion[0]} />
    </div>
  );
};

export default Page;
