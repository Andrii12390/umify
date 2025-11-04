import type { PropsWithChildren } from 'react';

import { toast } from 'sonner';

import { createDiagram } from '@/features/diagram/actions';

import { DiagramPopup } from './diagram-popup';

export const CreateDiagramPopup = ({ children }: PropsWithChildren) => {
  return (
    <DiagramPopup
      title="Add Diagram"
      submitLabel="Save"
      onSubmit={(values, { reset }) => {
        reset();
        createDiagram(values.name).then(res => {
          if (!res.success) {
            toast.error(res.error);
          }
        });
      }}
    >
      {children}
    </DiagramPopup>
  );
};
