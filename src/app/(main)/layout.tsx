import { MobileNav } from '@/components/mobile-nav';
import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full">
        <AppSidebar />
        <main className="flex h-full flex-1 flex-col overflow-auto">
          <div className="hidden h-14 items-center border-b md:flex">
            <SidebarTrigger />
          </div>
          <div className="flex-1">{children}</div>
          <MobileNav />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
