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
  const cardClassName = cn(
    'bg-card group flex cursor-pointer flex-col items-center justify-center rounded-md border px-6 py-8 shadow-md transition-colors',
    isActive ? 'border-primary/50 bg-primary/10' : 'hover:bg-primary/10 hover:border-primary/50',
  );

  const iconWrapperClassName = cn(
    'bg-secondary text-secondary-foreground group-hover:bg-primary/30 grid size-12 place-items-center rounded-full transition-colors',
    isActive && 'bg-primary/30',
  );

  return (
    <div
      onClick={onClick}
      className={cardClassName}
    >
      <div className={iconWrapperClassName}>
        <Icon />
      </div>
      <span className="mt-2 text-lg font-medium capitalize">{value}</span>
      <p className="text-secondary-foreground text-center text-xs">{text}</p>
    </div>
  );
};
