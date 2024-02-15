'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loginSchema } from '@/zod/loginSchema';
import { useRouter } from 'next/navigation';

type FormData = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async () => {
    setIsError(false);
    setIsLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: getValues('email'),
      password: getValues('password'),
    });
    setIsLoading(false);
    if (res && !res.error) {
      router.push('/admin/excursions');
    } else {
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
          {...register('password')}
        />
        {errors.password && (
          <div className="loginForm__error">{errors.password.message}</div>
        )}
      </div>
      {isError && (
        <div className="loginForm__error">Pogrešan email ili lozinka!</div>
      )}
      <button type="submit" className="loginForm__button" disabled={isLoading}>
        Prijava
      </button>
    </form>
  );
};

export default LoginForm;
