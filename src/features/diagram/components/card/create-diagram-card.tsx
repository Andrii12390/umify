'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CreateDiagramPopup } from '@/features/diagram/components/popups/create-diagram-popup';

export const CreateDiagramCard = () => {
  return (
    <CreateDiagramPopup>
      <Button className="bg-card group border-muted-foreground/25 hover:border-primary hover:bg-primary/5 relative flex min-h-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed p-6 transition-all">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-primary/10 rounded-full p-3 transition-transform group-hover:scale-110">
            <Plus className="text-primary size-5" />
          </div>

          <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium">
            Create new diagram
          </span>
        </div>
      </Button>
    </CreateDiagramPopup>
  );
};
