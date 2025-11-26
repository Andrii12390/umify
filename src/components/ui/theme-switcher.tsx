'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

export const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-secondary relative inline-flex h-9 w-16 cursor-pointer items-center rounded-full transition-colors"
    >
      <span
        className={cn(
          'bg-background inline-flex size-7 transform items-center justify-center rounded-full shadow-lg transition-transform',
          isDark ? 'translate-x-8' : 'translate-x-1',
        )}
      >
        {isDark ? (
          <Moon className="text-primary size-4" />
        ) : (
          <Sun className="size-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
};
