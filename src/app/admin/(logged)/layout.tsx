import '@/styles/app.scss';

import React from 'react';
import AdminNavbar from '@/app/components/Navbar/AdminNavbar';
import { useDetectWindowSize } from '@/hooks/useDetectWindowSize';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body>
        <AdminNavbar />
        {children}
      </body>
    </html>
  );
}