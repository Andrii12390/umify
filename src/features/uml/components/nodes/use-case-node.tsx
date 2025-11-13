import type { HandleType } from 'reactflow';

import { memo, useCallback } from 'react';
import { Handle, Position, useNodeId, type NodeProps } from 'reactflow';

import type { UseCaseData } from '@/features/uml/types';

import { EditableLabel } from '@/features/uml/components/edges';
import { DIAGRAM_CLS, HANDLE_BASE_CLS } from '@/features/uml/constants';
import { cn } from '@/lib/utils';

const handles: Array<{ id: string; type: HandleType; position: Position }> = [
  { id: 'left-tgt', type: 'target', position: Position.Left },
  { id: 'top-tgt', type: 'target', position: Position.Top },
  { id: 'right-src', type: 'source', position: Position.Right },
  { id: 'bot-src', type: 'source', position: Position.Bottom },
];

export const UseCaseNode = memo(function UseCaseNode({ data, selected }: NodeProps<UseCaseData>) {
  const nodeId = useNodeId()!;

  const handleCommit = useCallback(
    (label: string) => {
      data?.onChangeLabel?.(nodeId, label);
    },
    [data, nodeId],
  );

  return (
    <div className={cn('group relative transition-all', selected && DIAGRAM_CLS.useCaseSelected)}>
      {handles.map(({ id, type, position }) => (
        <Handle
          id={id}
          key={`${position}-${type}-${id}`}
          type={type}
          position={position}
          className={HANDLE_BASE_CLS}
          isConnectable
        />
      ))}

      <div className="border-foreground bg-background flex h-[90px] w-[145px] items-center justify-center rounded-[50%] border-2 shadow-sm">
        <div className="relative w-full px-4">
          <EditableLabel
            value={data?.label}
            fallback="Use Case"
            onCommit={handleCommit}
            classNames={{
              wrapperClassName: 'text-center text-xs leading-tight',
              inputClassName: 'text-center text-xs leading-tight',
            }}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
});
