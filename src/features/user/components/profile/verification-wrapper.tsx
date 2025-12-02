import type { ReactNode } from 'react';

import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PUBLIC_ROUTES } from '@/constants';

interface Props {
  isVerified: boolean;
  children: ReactNode;
}

export const VerificationWrapper = ({ isVerified, children }: Props) => {
  const router = useRouter();

  if (!isVerified) {
    return (
      <div className="space-y-4 md:w-xs">
        <div className="text-foreground/80 flex items-center gap-2">
          <Info className="size-5" />
          <span className="leading-none">Your account is not verified</span>
        </div>

        <div className="bg-foreground/15 h-0.5 rounded-md" />

        <Button
          className="text-md mx-auto w-full cursor-pointer"
          onClick={() => router.push(PUBLIC_ROUTES.VERIFICATION)}
        >
          Verify now
        </Button>
      </div>
    );
  }

  return children;
};
