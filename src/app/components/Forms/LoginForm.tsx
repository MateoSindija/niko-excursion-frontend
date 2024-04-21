'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loginSchema } from '@/zod/loginSchema';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import app, { auth } from '@/firebase/config';

type FormData = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async () => {
    setIsError(false);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        getValues('email'),
        getValues('password'),
      );
      const idToken = await credential.user.getIdToken();
      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      // Refresh page after updating browser cookies
      router.push('/admin/excursions');
    } catch (e) {
      setIsError(true);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
      <div className="loginForm__title">Prijava</div>
      <div className="loginForm__inputContainer">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          autoComplete="username"
          disabled={isSubmitting}
          {...register('email')}
        />
        {errors.email && (
          <div className="loginForm__error">{errors.email.message}</div>
        )}
      </div>
      <div className="loginForm__inputContainer">
        <label htmlFor="password">Lozinka</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isSubmitting}
          {...register('password')}
        />
        {errors.password && (
          <div className="loginForm__error">{errors.password.message}</div>
        )}
      </div>
      {isError && (
        <div className="loginForm__error">Pogrešan email ili lozinka!</div>
      )}
      <button
        type="submit"
        className="loginForm__button"
        disabled={isSubmitting}
      >
        Prijava
      </button>
      <Link href={'/'}>Povratak na glavnu stranicu</Link>
      <Link href={'/admin/reset-password'}>Zaboravljena Lozinka</Link>
    </form>
  );
};

export default LoginForm;
