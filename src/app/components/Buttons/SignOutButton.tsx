'use client';
import React from 'react';
import { getAuth, signOut } from '@firebase/auth';
import app, { auth } from '@/firebase/config';
import { redirect, useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();
  return (
    <button
      className="signOut"
      onClick={async () => {
        await signOut(auth);

        await fetch('/api/logout', {
          method: 'GET',
        });
        router.push('/admin');
      }}
    >
      Odjava
    </button>
  );
};

export default SignOutButton;
