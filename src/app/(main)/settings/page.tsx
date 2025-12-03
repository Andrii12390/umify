import type { Metadata } from 'next';

import { Header } from '@/components/header';
import { DiagramSettings } from '@/features/settings/components';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your preferences here',
};

export const dynamic = 'force-dynamic';

function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <div className="flex-1 overflow-y-auto">
        <DiagramSettings />
      </div>
    </>
  );
}

export default SettingsPage;
