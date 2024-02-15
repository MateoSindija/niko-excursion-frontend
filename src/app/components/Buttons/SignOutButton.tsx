'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <button
      className="signOut"
      onClick={() => signOut({ callbackUrl: '/admin' })}
    >
      Odjava
    </button>
  );
};

export default SignOutButton;
