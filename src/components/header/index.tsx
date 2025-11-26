import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { ThemeSwitcher } from '@/components/ui/theme-switcher';

interface Props {
  backHref?: string;
  title?: string;
}

export const Header = ({ backHref, title }: Props) => (
  <header className="bg-background sticky top-0 z-100 flex h-18 shrink-0 items-center justify-between border-b px-4 md:h-14 md:px-6">
    <div className="flex items-center gap-2">
      {backHref ? (
        <Link
          className="flex cursor-pointer items-center gap-2"
          href={backHref!}
        >
          <ChevronLeft />
          <span className="text-2xl font-medium md:text-xl">Go Back</span>
        </Link>
      ) : (
        <span className="text-2xl font-medium md:text-xl">{title}</span>
      )}
    </div>

    <ThemeSwitcher />
  </header>
);
