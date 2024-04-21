import React, { useContext } from 'react';
import Link from 'next/link';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import { getServerSession } from 'next-auth';
import getExcursions from '@/app/api/database/getExcursions';
import { redirect, useRouter } from 'next/navigation';
import CalendarAndTime from '@/app/components/Calendar/CalendarAndTime';
import AdminNavbar from '@/app/components/Navbar/AdminNavbar';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import app, { auth } from '@/firebase/config';
import { AuthContext } from '@/app/utils/AuthProvider';

const Page = async () => {
  onAuthStateChanged(auth, (user) => {
    let redirectPath: string | null = null;
    try {
      if (!user) redirectPath = `/admin`;
    } catch (error) {
      //Rest of the code
      redirectPath = `/`;
    } finally {
      console.log(user);
      //Clear resources
      // if (redirectPath) redirect(redirectPath);
    }
  });
  // if (await !getAuth(app).currentUser) {
  //   redirect('/admin');
  //   return null;
  // }
  return (
    <div className="excursionsPage">
      <CalendarAndTime />
    </div>
  );
};

export default Page;
