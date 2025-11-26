import { clsx } from 'clsx';
import { memo, useCallback } from 'react';
import { Handle, Position, useNodeId, type NodeProps, type HandleType } from 'reactflow';

import type { ActorData } from '@/features/uml/types';

import { DIAGRAM_CLS, HANDLE_BASE_CLS } from '@/features/uml/constants';
import { cn } from '@/lib/utils';

import { EditableLabel } from '../edges';

const handles: Array<{
  id: string;
  type: HandleType;
  position: Position;
  style: Record<string, string | number>;
}> = [
  {
    id: 'left-tgt',
    type: 'target',
    position: Position.Left,
    style: { top: 36, left: -6 },
  },
  {
    id: 'right-src',
    type: 'source' as const,
    position: Position.Right,
    style: { top: 36, right: -10 },
  },
  {
    id: 'top-src',
    type: 'source',
    position: Position.Top,
    style: { top: -10, left: '50%', transform: 'translateX(-50%)' },
  },
  {
    id: 'bot-tgt',
    type: 'target' as const,
    position: Position.Bottom,
    style: { bottom: -6, left: '50%', transform: 'translateX(-50%)' },
  },
];

export const ActorNode = memo(function ActorNode({ data, selected }: NodeProps<ActorData>) {
  const nodeId = useNodeId()!;

  const handleCommit = useCallback(
    (label: string) => {
      data?.onChangeLabel?.(nodeId, label);
    },
    [data, nodeId],
  );

  return (
    <div
      className={cn(
        'group text-foreground relative px-2 py-1 transition-all',
        selected && DIAGRAM_CLS.nodeSelected,
      )}
    >
      <div className="relative mx-auto h-24 w-14">
        {handles.map(({ id, type, position, style }) => (
          <Handle
            id={id}
            key={`${position}-${type}-${id}`}
            type={type}
            position={position}
            className={clsx(HANDLE_BASE_CLS, 'absolute', selected && 'opacity-100')}
            style={style}
            isConnectable
          />
        ))}
        <svg
          width={56}
          height={96}
          viewBox="0 0 56 96"
        >
          <g
            stroke="currentColor"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="28"
              cy="14"
              r="10"
            />
            <line
              x1="28"
              y1="24"
              x2="28"
              y2="56"
            />
            <line
              x1="10"
              y1="34"
              x2="46"
              y2="34"
            />
            <line
              x1="28"
              y1="56"
              x2="12"
              y2="86"
            />
            <line
              x1="28"
              y1="56"
              x2="44"
              y2="86"
            />
          </g>
        </svg>
      </div>

      <div className="relative mt-1 flex justify-center">
        <EditableLabel
          value={data?.label}
          fallback="Actor"
          onCommit={handleCommit}
          classNames={{
            wrapperClassName: 'text-center text-xs leading-snug font-medium',
            inputClassName: 'text-center text-xs leading-snug',
          }}
          rows={2}
        />
      </div>
    </div>
  );
});
