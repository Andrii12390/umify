import type { Metadata } from 'next';

import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Manage your personal data in easy way',
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header title="Profile" />
      {children}
    </>
  );
}

export default Layout;
