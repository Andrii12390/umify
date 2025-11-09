import { useReactFlow } from 'reactflow';

import type { EdgeType } from '@/features/uml/types';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { saveDiagram } from '@/features/uml/actions';
import { DIAGRAM_CLS } from '@/features/uml/constants';

const NODE_BUTTONS = [
  { label: 'Actor', onClick: (onAdd: () => void) => onAdd, variant: 'default' as const },
  { label: 'Use Case', onClick: (onAdd: () => void) => onAdd, variant: 'default' as const },
  { label: 'Note', onClick: (onAdd: () => void) => onAdd, variant: 'outline' as const },
  { label: 'Boundary', onClick: (onAdd: () => void) => onAdd, variant: 'outline' as const },
] as const;

const EDGE_TYPES: EdgeType[] = ['association', 'include', 'extend', 'generalization'];
const EDGE_LABELS: Record<EdgeType, string> = {
  association: 'Association',
  include: 'Include',
  extend: 'Extend',
  generalization: 'Generalization',
};

type Props = {
  diagramId: string;
  selectedEdgeType: EdgeType;
  onEdgeTypeChange: (type: EdgeType) => void;
  onAddActor: () => void;
  onAddUseCase: () => void;
  onAddNote: () => void;
  onAddBoundary: () => void;
};

export const Toolbar = ({
  diagramId,
  selectedEdgeType,
  onEdgeTypeChange,
  onAddActor,
  onAddUseCase,
  onAddNote,
  onAddBoundary,
}: Props) => {
  const nodeHandlers = [onAddActor, onAddUseCase, onAddNote, onAddBoundary];
  const { toObject } = useReactFlow();

  return (
    <div className={DIAGRAM_CLS.toolbar}>
      <div className="space-y-2">
        <div className={DIAGRAM_CLS.toolbarLabel}>Nodes</div>
        <div className="flex flex-wrap gap-2">
          {NODE_BUTTONS.map((button, i) => (
            <Button
              key={button.label}
              size="sm"
              variant={button.variant}
              onClick={nodeHandlers[i]}
            >
              {button.label}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={() => {
              saveDiagram(diagramId, JSON.stringify(toObject()));
            }}
          >
            save diagram
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className={DIAGRAM_CLS.toolbarLabel}>Connection Type</div>
        <Select
          value={selectedEdgeType}
          onValueChange={onEdgeTypeChange}
        >
          <SelectTrigger className="h-8 w-44 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="text-xs">
            {EDGE_TYPES.map(type => (
              <SelectItem
                key={type}
                value={type}
              >
                {EDGE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={DIAGRAM_CLS.hint}>
        Delete/Backspace to delete • double click on label to edit
      </div>
    </div>
  );
};
