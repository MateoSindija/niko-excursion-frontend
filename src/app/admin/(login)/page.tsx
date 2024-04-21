import React from 'react';
import LoginForm from '@/app/components/Forms/LoginForm';
import { getAuth } from '@firebase/auth';
import app from '@/firebase/config';

const Page = () => {
  return (
    <div className="adminPage">
      <LoginForm />
    </div>
  );
};

export default Page;
