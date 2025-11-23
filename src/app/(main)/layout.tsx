import { getUser } from '@/actions';
import { MobileNav } from '@/components/mobile-nav';
import { Sidebar } from '@/components/sidebar';
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
        <Sidebar {...user} />
        <div className="flex flex-1 flex-col">
          <div className="flex min-h-0! flex-1 flex-col">{children}</div>
          <MobileNav />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
