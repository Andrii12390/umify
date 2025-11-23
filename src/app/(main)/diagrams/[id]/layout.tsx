import { Header } from '@/components/header';
import { PRIVATE_ROUTES } from '@/constants';

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header backHref={PRIVATE_ROUTES.DIAGRAMS} />
      {children}
    </>
  );
}

export default Layout;
