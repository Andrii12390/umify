import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import { AppProvider } from '@/providers';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Umify',
  description: 'Your powerful tool for building awesome UMl-diagrams',
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
