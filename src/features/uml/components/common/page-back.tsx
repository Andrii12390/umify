import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { PRIVATE_ROUTES } from '@/constants';

export const PageBack = () => {
  return (
    <header className="fixed top-0 z-100 h-16 w-full border-b p-4 md:hidden">
      <Link
        className="flex cursor-pointer items-center gap-2"
        href={PRIVATE_ROUTES.DIAGRAMS}
      >
        <ChevronLeft />
        <span className="text-xl">Go Back</span>
      </Link>
    </header>
  );
};
