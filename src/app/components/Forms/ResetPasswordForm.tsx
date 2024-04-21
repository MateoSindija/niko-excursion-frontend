'use client';
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import { auth } from '@/firebase/config';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState<undefined | boolean>(undefined);
  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSuccess(true);
      setEmail('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form onSubmit={handleReset}>
        <label htmlFor="reset">Upišite svoj e-mail</label>
        <input
          type="email"
          id={'reset'}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Potvrdi</button>
        {isSuccess !== undefined && isSuccess && (
          <div>Mail je uspješno poslan!</div>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordForm;
