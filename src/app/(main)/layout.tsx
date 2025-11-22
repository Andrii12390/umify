import { getUser } from '@/actions';
import { MobileNav } from '@/components/mobile-nav';
import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full">
        <AppSidebar {...user} />
        <main className="flex h-full flex-1 flex-col">
          <div className="hidden h-14 items-center border-b md:flex"></div>
          <div className="flex-1 overflow-auto">{children}</div>
          <MobileNav />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
