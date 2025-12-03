'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { CreateDiagramPopup } from '../popups/create-diagram-popup';

export const CreateDiagramCard = () => (
  <CreateDiagramPopup>
    <Button className="bg-card group border-muted-foreground/25 hover:border-primary hover:bg-primary/5 relative flex h-50 w-55 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed p-6 md:h-55 md:w-60">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-primary/10 rounded-full p-4 transition-transform group-hover:scale-110">
          <Plus className="text-primary size-6" />
        </div>

        <span className="text-muted-foreground group-hover:text-foreground text-md font-medium">
          Create new diagram
        </span>
      </div>
    </Button>
  </CreateDiagramPopup>
);
