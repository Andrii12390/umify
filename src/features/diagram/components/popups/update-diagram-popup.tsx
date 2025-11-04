import type { PropsWithChildren } from 'react';

import { DiagramPopup } from './diagram-popup';

interface Props extends PropsWithChildren {
  name: string;
  handleUpdate: ({ name }: { name: string }) => void;
}

export const UpdateDiagramPopup = ({ name, handleUpdate, children }: Props) => {
  return (
    <DiagramPopup
      title="Edit Diagram"
      submitLabel="Save"
      defaults={{ name }}
      onSubmit={(values, { reset }) => {
        reset();
        handleUpdate(values);
      }}
    >
      {children}
    </DiagramPopup>
  );
};
