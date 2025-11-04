import type { PropsWithChildren } from 'react';

import { createDiagram } from '@/features/diagram/actions';

import { DiagramPopup } from './diagram-popup';

export const CreateDiagramPopup = ({ children }: PropsWithChildren) => {
  return (
    <DiagramPopup
      title="Add Diagram"
      submitLabel="Save"
      onSubmit={(values, { reset }) => {
        reset();
        createDiagram(values.name);
      }}
    >
      {children}
    </DiagramPopup>
  );
};
