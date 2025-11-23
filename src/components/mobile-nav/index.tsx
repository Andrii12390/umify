'use client';

import Link from 'next/link';

import { useMenu } from '@/hooks';
import { cn } from '@/lib/utils';

export const MobileNav = () => {
  const menu = useMenu();

  return (
    <nav className="border-t md:hidden">
      <ul className="grid grid-cols-3">
        {menu.map(({ href, label, icon: Icon, isActive }) => (
          <li
            key={label}
            className={cn(
              'text-muted-foreground flex h-18 flex-col items-center justify-center',
              isActive && 'text-primary',
            )}
          >
            <Icon />
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
