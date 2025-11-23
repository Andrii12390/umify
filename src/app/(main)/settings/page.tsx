import type { Metadata } from 'next';

import { Header } from '@/components/header';
import { DiagramSettings } from '@/features/settings/components/diagram-settings';
import { ThemeSwitcher } from '@/features/settings/components/theme-switcher';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your preferences here',
};

export const dynamic = 'force-dynamic';

function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <ThemeSwitcher />
      <DiagramSettings />
    </>
  );
}

export default SettingsPage;
