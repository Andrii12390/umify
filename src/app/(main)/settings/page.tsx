import { DiagramSettings } from '@/features/settings/components/diagram-settings';
import { ThemeSwitcher } from '@/features/settings/components/theme-switcher';

function SettingsPage() {
  return (
    <>
      <ThemeSwitcher />
      <DiagramSettings />
    </>
  );
}

export default SettingsPage;
