'use client';

import { useTheme } from 'next-themes';

import { ThemeCard } from '@/features/settings/components/theme-card';
import { THEME_OPTIONS } from '@/features/settings/constants';

export const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Appearance</h2>
        <p className="text-secondary-foreground text-sm">
          Customize the theme and appearance of the interface
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {THEME_OPTIONS.map(option => (
          <ThemeCard
            key={option.value}
            onClick={() => setTheme(option.value)}
            isActive={option.value === resolvedTheme}
            {...option}
          />
        ))}
      </div>
    </div>
  );
};
