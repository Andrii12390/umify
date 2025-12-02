import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

import { Trash2, SquarePen, Star } from 'lucide-react';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { deleteDiagram, updateDiagram } from '@/features/diagram/actions';

import { UpdateDiagramPopup } from '../popups/update-diagram-popup';

interface Props extends PropsWithChildren {
  id: string;
  name: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DiagramActions = ({ id, name, isOpen, setIsOpen, children }: Props) => (
  <DropdownMenu
    open={isOpen}
    onOpenChange={setIsOpen}
  >
    <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="text-foreground/80 w-50 overflow-y-auto px-0"
      onClick={e => e.stopPropagation()}
    >
      <DropdownMenuLabel className="text-secondary-foreground text-foreground/80 text-xs font-bold uppercase">
        More Actions
      </DropdownMenuLabel>

      <UpdateDiagramPopup
        name={name}
        handleUpdate={values => {
          updateDiagram({ id, ...values }).then(res => {
            if (!res.success) {
              toast.error(res.error);
            }
          });
        }}
      >
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-none px-3"
          onSelect={e => e.preventDefault()}
        >
          <SquarePen className="size-4" />
          <span>Edit</span>
        </DropdownMenuItem>
      </UpdateDiagramPopup>
      <DropdownMenuItem
        className="flex cursor-pointer items-center rounded-none px-3"
        onClick={() => {
          // TODO: implement favorites
        }}
      >
        <Star className="size-4" />
        <span>Add to favorites</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="flex cursor-pointer items-center rounded-none px-3"
        onClick={() => {
          deleteDiagram(id).then(res => {
            if (!res.success) {
              toast.error(res.error);
            }
          });
        }}
      >
        <Trash2 className="text-destructive size-4" />
        <span className="text-destructive">Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
