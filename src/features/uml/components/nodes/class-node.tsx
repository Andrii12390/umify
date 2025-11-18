import { memo, useCallback } from 'react';
import { Handle, Position, useNodeId, type HandleType, type NodeProps } from 'reactflow';

import type { ClassNodeData } from '@/features/uml/types';

import { DIAGRAM_CLS, HANDLE_BASE_CLS } from '@/features/uml/constants';
import { cn } from '@/lib/utils';

import { EditableLabel } from '../edges';

const handleConfigs: Array<{
  id: string;
  type: HandleType;
  position: Position;
  style: Record<string, string | number>;
}> = [
  { id: 'top-src', type: 'source', position: Position.Top, style: { left: '30%', top: -8 } },
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

export const ClassNode = memo(function ClassNode({ data, selected }: NodeProps<ClassNodeData>) {
  const nodeId = useNodeId()!;

  const commitName = useCallback(
    (value: string) => {
      data?.onChangeClassName?.(nodeId, value);
    },
    [data, nodeId],
  );

  const commitAttributes = useCallback(
    (value: string) => {
      data?.onChangeClassAttributes?.(nodeId, value);
    },
    [data, nodeId],
  );

  const commitMethods = useCallback(
    (value: string) => {
      data?.onChangeClassMethods?.(nodeId, value);
    },
    [data, nodeId],
  );

  return (
    <div
      className={cn(
        'group border-border bg-background relative flex min-h-[120px] min-w-[180px] flex-col rounded border text-sm shadow-sm',
        selected && DIAGRAM_CLS.nodeSelected,
      )}
    >
      {handleConfigs.map(({ id, type, position, style }) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={position}
          className={cn(HANDLE_BASE_CLS, 'absolute')}
          style={style}
          isConnectable
        />
      ))}

      <div className="border-border border-b px-4 py-2 text-center font-semibold">
        <EditableLabel
          value={data?.className}
          fallback="ClassName"
          onCommit={commitName}
          asInput
          allowEmpty
          classNames={{
            wrapperClassName: 'text-sm font-semibold tracking-wide',
            inputClassName:
              'w-full text-center text-sm font-semibold tracking-wide focus:outline-none',
          }}
        />
      </div>

      <div className="border-border border-b px-4 py-2">
        <EditableLabel
          value={data?.attributes}
          fallback="+ attribute: Type"
          onCommit={commitAttributes}
          rows={4}
          allowEmpty
          classNames={{
            wrapperClassName: 'text-xs whitespace-pre-wrap',
            inputClassName: 'text-xs',
          }}
          placeholder="+ attribute: Type"
        />
      </div>

      <div className="px-4 py-2">
        <EditableLabel
          value={data?.methods}
          fallback="+ operation(): ReturnType"
          onCommit={commitMethods}
          rows={4}
          allowEmpty
          classNames={{
            wrapperClassName: 'text-xs whitespace-pre-wrap',
            inputClassName: 'text-xs',
          }}
          placeholder="+ operation(): ReturnType"
        />
      </div>
    </div>
  );
});
