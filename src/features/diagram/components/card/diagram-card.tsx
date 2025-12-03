'use client';

import type { Dispatch, SetStateAction } from 'react';

import { Clock, Eye, MoreHorizontal, Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DiagramActions } from '@/features/diagram/components/card/diagram-actions';
import { formatDate } from '@/utils';

interface DiagramCardProps {
  id: string;
  name: string;
  isFavorite: boolean;
  updatedAt: Date;
}

const DiagramPreview = ({ theme, isFavorite }: { theme: string; isFavorite: boolean }) => (
  <div className="relative flex-1">
    {isFavorite && (
      <Star className="absolute top-2 left-2 z-100 size-5 fill-yellow-300 stroke-yellow-300" />
    )}
    <Image
      src={`/diagram-preview-${theme}.png`}
      alt="Diagram preview"
      fill
      className="object-cover"
    />
  </div>
);

const ActionButton = ({
  id,
  name,
  isFavorite,
  isOpen,
  setIsOpen,
}: {
  id: string;
  name: string;
  isFavorite: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <DiagramActions
    id={id}
    name={name}
    isFavorite={isFavorite}
    isOpen={isOpen}
    setIsOpen={setIsOpen}
  >
    <Button
      size="icon"
      className="hover:bg-primary absolute top-2 right-2 z-50 size-7 cursor-pointer rounded-sm bg-neutral-700 opacity-100 transition-all duration-300 ease-out md:translate-y-[-0.75rem] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
      variant="secondary"
    >
      <MoreHorizontal className="size-5 text-gray-50" />
    </Button>
  </DiagramActions>
);

const DiagramInfo = ({ name, updatedAt }: { name: string; updatedAt: Date }) => (
  <div className="min-w-0 space-y-2">
    <h3 className="truncate text-sm leading-none font-semibold">{name}</h3>
    <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
      <Clock className="size-3" />
      <span className="truncate leading-none">{formatDate(updatedAt)}</span>
    </div>
  </div>
);

const PublicBadge = () => (
  <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
    <Eye className="size-3" />
    <span className="leading-none">Public</span>
  </div>
);

export const DiagramCard = ({ id, name, isFavorite, updatedAt }: DiagramCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme = 'light' } = useTheme();

  return (
    <div className="group bg-card relative mx-auto flex h-50 w-55 flex-col overflow-hidden rounded-md border shadow-sm transition-shadow hover:shadow-lg md:h-55 md:w-60">
      <DiagramPreview
        theme={resolvedTheme}
        isFavorite={isFavorite}
      />
      <ActionButton
        id={id}
        name={name}
        isFavorite={isFavorite}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="bg-card/95 flex items-start justify-between gap-2 border-t px-3 py-2.5">
        <DiagramInfo
          name={name}
          updatedAt={updatedAt}
        />
        <PublicBadge />
      </div>
    </div>
  );
};
