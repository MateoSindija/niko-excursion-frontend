import React from 'react';
import Link from 'next/link';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import { getServerSession } from 'next-auth';
import getExcursions from '@/app/api/database/getExcursions';
import { redirect } from 'next/navigation';
import CalendarAndTime from '@/app/components/Calendar/CalendarAndTime';
import AdminNavbar from '@/app/components/Navbar/AdminNavbar';

const Page = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/admin');
    return null;
  }
  return (
    <div className="excursionsPage">
      <CalendarAndTime />
    </div>
  );
};

export default Page;
