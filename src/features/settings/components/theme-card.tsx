import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  value: string;
  text: string;
  onClick: () => void;
  isActive: boolean;
  icon: LucideIcon;
}

export const ThemeCard = ({ value, text, onClick, isActive, icon: Icon }: Props) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-card flex cursor-pointer flex-col items-center justify-center rounded-md border px-6 py-8 shadow-md transition-colors',
        isActive ? 'border-primary bg-primary/15' : 'hover:bg-primary/15 hover:border-primary',
      )}
    >
      <div className="bg-primary/30 text-secondary-foreground grid size-12 place-items-center rounded-full">
        <Icon />
      </div>

      <span className="mt-2 text-lg font-medium capitalize">{value}</span>
      <p className="text-secondary-foreground text-center text-xs">{text}</p>
    </div>
  );
};
