import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { ThemeSwitcher } from '@/components/ui/theme-switcher';

interface Props {
  backHref?: string;
  title?: string;
}

export const Header = ({ backHref, title }: Props) => (
  <header className="flex h-18 shrink-0 items-center justify-between border-b px-6 md:h-14">
    <div className="flex items-center gap-2">
      {!!backHref ? (
        <Link
          className="flex cursor-pointer items-center gap-2"
          href={backHref!}
        >
          <ChevronLeft />
          <span className="text-xl font-medium">Go Back</span>
        </Link>
      ) : (
        <span className="text-xl font-medium">{title}</span>
      )}
    </div>

    <ThemeSwitcher />
  </header>
);
