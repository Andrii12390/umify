import { Header } from '@/components/header';

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header title="Profile" />
      {children}
    </>
  );
}

export default Layout;
