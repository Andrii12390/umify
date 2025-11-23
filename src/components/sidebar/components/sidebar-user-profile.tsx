import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PUBLIC_ROUTES } from '@/constants';
interface Props {
  username: string;
  email: string;
  isCollapsed: boolean;
}

export const SidebarUserProfile = ({ username, email, isCollapsed }: Props) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(PUBLIC_ROUTES.SIGN_IN);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
        <span className="text-lg font-bold text-white">{username[0].toUpperCase()}</span>
      </div>
      {!isCollapsed && (
        <>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate font-medium">{username}</span>
            <span className="text-muted-foreground truncate text-xs">{email}</span>
          </div>
          <Button
            className="ml-auto cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={handleLogout}
          >
            <LogOut className="size-5" />
          </Button>
        </>
      )}
    </div>
  );
};
