'use client';

import { useTheme } from 'next-themes';

import { ThemeCard } from '@/features/settings/components/theme-card';
import { THEME_OPTIONS } from '@/features/settings/constants';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid gap-4 p-4 md:grid-cols-3 lg:p-6">
      {THEME_OPTIONS.map(o => (
        <ThemeCard
          key={o.value}
          value={o.value}
          text={o.text}
          onClick={() => setTheme(o.value)}
          isActive={o.value === theme}
          icon={o.icon}
        />
      ))}
    </div>
  );
};
