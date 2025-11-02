'use client';

import { Settings, User, BarChart3 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { PRIVATE_ROUTES } from '@/constants';

export const useMenu = () => {
  const pathname = usePathname();

  return useMemo(
    () => [
      {
        href: PRIVATE_ROUTES.DIAGRAMS,
        icon: BarChart3,
        label: 'Diagrams',
        isActive: pathname.startsWith(PRIVATE_ROUTES.DIAGRAMS),
      },
      {
        href: PRIVATE_ROUTES.PROFILE,
        icon: User,
        label: 'Profile',
        isActive: pathname.startsWith(PRIVATE_ROUTES.PROFILE),
      },
      {
        href: PRIVATE_ROUTES.SETTINGS,
        icon: Settings,
        label: 'Settings',
        isActive: pathname.startsWith(PRIVATE_ROUTES.SETTINGS),
      },
    ],
    [pathname],
  );
};
