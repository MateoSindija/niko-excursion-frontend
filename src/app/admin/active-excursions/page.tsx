import React from 'react';
import Link from 'next/link';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import { getServerSession } from 'next-auth';
import getExcursions from '@/app/api/database/getExcursions';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/admin');
    return null;
  }
  return (
    <div>
      <div className="excursionsPage__nav">
        <Link href="/admin/new-excursion">
          <button className="excursionsPage__nav__newExcursion" type="submit">
            Dodaj novu eskurziju
          </button>
        </Link>
        <Link href="/admin/excursions">
          <button className="excursionsPage__nav__newExcursion" type="submit">
            Lista eskurzija
          </button>
        </Link>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Page;
