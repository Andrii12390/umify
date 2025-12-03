'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

export const EmptyFavorites = () => {
  const { resolvedTheme = 'light' } = useTheme();

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2">
      <Image
        src={`/empty-favorites-${resolvedTheme}.svg`}
        alt="Empty favorites"
        width="225"
        height="225"
      />
      <p className="text-foreground/80 text-lg font-semibold">No Favorites</p>
      <p className="text-foreground/80 text-sm">You haven&apos;t marked any favorites</p>
    </div>
  );
};
