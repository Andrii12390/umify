'use client';

import { BarChart3, Clock, MoreVertical } from 'lucide-react';
import { useState } from 'react';

import { DiagramActions } from '@/features/diagram/components/card/diagram-actions';

interface Props {
  id: string;
  name: string;
  lastModified?: string;
}

export const DiagramCard = ({ id, name, lastModified }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group bg-card relative flex h-full min-h-32 cursor-pointer flex-col justify-between overflow-hidden rounded-lg border p-6 shadow-sm">
      <h3 className="text-sm font-semibold">{name}</h3>

      <div className="bg-primary/10 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <div className="bg-background scale-90 transform rounded-full p-3 shadow-lg transition-transform group-hover:scale-100">
          <BarChart3 className="size-5" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="text-secondary-foreground flex items-center gap-1.5 text-xs">
          <Clock className="size-4" />
          <span>{lastModified ?? 'a long time ago'}</span>
        </div>

        <DiagramActions
          id={id}
          name={name}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <div className="flex size-7 items-center justify-center rounded transition-all group-hover:opacity-100 lg:opacity-0">
            <MoreVertical className="size-4" />
          </div>
        </DiagramActions>
      </div>
    </div>
  );
};
