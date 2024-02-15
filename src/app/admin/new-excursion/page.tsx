import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SignOutButton from '@/app/components/Buttons/SignOutButton';
import Link from 'next/link';
import ExcursionForm from '@/app/components/Forms/ExcursionForm';

const Page = () => {
  const session = getServerSession();
  if (!session) {
    redirect('/admin');
  }
  return (
    <div>
      <div className="excursionsPage__nav">
        <Link href="/admin/excursions">
          <button className="excursionsPage__nav__newExcursion" type="submit">
            Lista eskurzija
          </button>
        </Link>
        <SignOutButton />
      </div>
      <ExcursionForm />
    </div>
  );
};

export default Page;
