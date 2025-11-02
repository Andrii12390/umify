'use client';

import Link from 'next/link';

import { useMenu } from '@/hooks';
import { cn } from '@/lib/utils';

export const MobileNav = () => {
  const menuList = useMenu();

  return (
    <nav className="border-t md:hidden">
      <ul className="grid grid-cols-3">
        {menuList.map(item => (
          <li
            key={item.label}
            className={cn(
              'text-muted-foreground flex h-16 flex-col items-center justify-center',
              item.isActive && 'text-primary',
            )}
          >
            <item.icon />
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
