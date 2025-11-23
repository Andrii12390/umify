import { Header } from '@/components/header';
import { DiagramSettings } from '@/features/settings/components/diagram-settings';
import { ThemeSwitcher } from '@/features/settings/components/theme-switcher';

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
