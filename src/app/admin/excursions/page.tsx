import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import Link from 'next/link';
import getExcursions from '@/app/api/database/getExcursions';
import ExcursionsList from '@/app/components/Lists/ExcursionsList';

const Page = async () => {
  const session = await getServerSession();
  const excursions = await getExcursions();

  if (!session) {
    redirect('/admin');
  }
  return (
    <div className="excursionsPage">
      <div className="excursionsPage__nav">
        <Link href="/admin/new-excursion">
          <button className="excursionsPage__nav__newExcursion" type="submit">
            Dodaj novu eskurziju
          </button>
        </Link>
        <SignOutButton />
      </div>
      <ExcursionsList excursions={excursions} />
    </div>
  );
};

export default Page;
