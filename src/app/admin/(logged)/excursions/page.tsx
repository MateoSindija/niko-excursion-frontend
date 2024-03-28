import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import Link from 'next/link';
import getExcursions from '@/app/api/database/getExcursions';
import ExcursionsList from '@/app/components/Lists/ExcursionsList';
import AdminNavbar from '@/app/components/Navbar/AdminNavbar';

const Page = async () => {
  const session = await getServerSession();
  const excursions = await getExcursions();

  if (!session) {
    redirect('/admin');
    return null;
  }
  return (
    <div className="excursionsPage">
      <ExcursionsList excursions={excursions} />
    </div>
  );
};

export default Page;
