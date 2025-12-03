import { clsx } from 'clsx';
import { memo, useCallback } from 'react';
import { Handle, Position, useNodeId, type HandleType, type NodeProps } from 'reactflow';

import type { PackageNodeData } from '@/features/uml/types';

import { HANDLE_BASE_CLS } from '@/features/uml/constants';
import { cn } from '@/lib/utils';

import { EditableLabel } from '../edges';

const handleConfigs: Array<{
  id: string;
  type: HandleType;
  position: Position;
  style: Record<string, string | number>;
}> = [
  { id: 'top-tgt', type: 'target', position: Position.Top, style: { left: '70%', top: -8 } },
  {
    id: 'bottom-src',
    type: 'source',
    position: Position.Bottom,
    style: { left: '30%', bottom: -8 },
  },
  {
    id: 'bottom-tgt',
    type: 'target',
    position: Position.Bottom,
    style: { left: '70%', bottom: -8 },
  },
  { id: 'left-src', type: 'source', position: Position.Left, style: { top: '30%', left: -8 } },
  { id: 'left-tgt', type: 'target', position: Position.Left, style: { top: '70%', left: -8 } },
  { id: 'right-src', type: 'source', position: Position.Right, style: { top: '30%', right: -8 } },
  { id: 'right-tgt', type: 'target', position: Position.Right, style: { top: '70%', right: -8 } },
];

export const PackageNode = memo(function PackageNode({
  data,
  selected,
}: NodeProps<PackageNodeData>) {
  const nodeId = useNodeId()!;

  const commitName = useCallback(
    (value: string) => {
      data?.onChangeLabel?.(nodeId, value);
    },
    [data, nodeId],
  );

  return (
    <div className="group relative inline-flex">
      {handleConfigs.map(({ id, type, position, style }) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={position}
          className={clsx(HANDLE_BASE_CLS, 'absolute', selected && 'opacity-100')}
          style={style}
          isConnectable
        />
      ))}
      <div
        className={cn(
          'bg-background relative min-h-[120px] min-w-[180px] border-2',
          selected ? 'border-primary' : 'border-border',
        )}
      >
        <div
          className={cn(
            'bg-background absolute -top-8 -left-0.5 h-8 w-1/3 border-2',
            selected ? 'border-primary' : 'border-border',
          )}
        />

        <div className="flex h-full items-center justify-center px-4 py-4">
          <EditableLabel
            value={data?.label}
            fallback="package"
            onCommit={commitName}
            asInput
            allowEmpty
            classNames={{
              wrapperClassName: 'text-base font-black tracking-wide',
              inputClassName:
                'w-full text-center text-base font-black tracking-wide focus:outline-none',
            }}
          />
        </div>
      </div>
    </div>
  );
});
