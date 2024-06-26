import React from 'react';
import '@/styles/app.scss';

export const metadata = {
  title: 'Boat Excursion Niko | Admin',
  description: 'Generated by Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  );
}
