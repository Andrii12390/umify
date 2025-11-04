import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

import { Trash2, SquarePen } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { deleteDiagram, updateDiagram } from '@/features/diagram/actions';
import { UpdateDiagramPopup } from '@/features/diagram/components/popups/update-diagram-popup';

interface Props extends PropsWithChildren {
  id: string;
  name: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DiagramActions = ({ id, name, isOpen, setIsOpen, children }: Props) => {
  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <DropdownMenuLabel>Diagram Actions</DropdownMenuLabel>

        <UpdateDiagramPopup
          name={name}
          handleUpdate={values => {
            updateDiagram({ id, ...values });
          }}
        >
          <DropdownMenuItem
            className="flex items-center justify-between"
            onSelect={e => e.preventDefault()}
          >
            <span>Edit</span>
            <SquarePen />
          </DropdownMenuItem>
        </UpdateDiagramPopup>
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => deleteDiagram(id)}
        >
          <span>Delete</span>
          <Trash2 className="text-destructive" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
