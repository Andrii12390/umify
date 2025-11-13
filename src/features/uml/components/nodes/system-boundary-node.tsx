import { memo, useCallback } from 'react';
import { NodeResizer, useNodeId, useReactFlow, type NodeProps } from 'reactflow';

import type { SystemBoundaryData } from '@/features/uml/types';

import { EditableLabel } from '@/features/uml/components/edges';
import { DIAGRAM_CLS, SYSTEM_BOUNDARY } from '@/features/uml/constants';
import { cn } from '@/lib/utils';

export const SystemBoundaryNode = memo(function SystemBoundaryNode({
  data,
  selected,
}: NodeProps<SystemBoundaryData>) {
  const nodeId = useNodeId()!;
  const { setNodes } = useReactFlow();

  const handleCommit = useCallback(
    (title: string) => {
      data?.onChangeTitle?.(nodeId, title);
    },
    [data, nodeId],
  );

  return (
    <div className={cn(DIAGRAM_CLS.systemBoundary, selected && DIAGRAM_CLS.nodeSelected)}>
      <NodeResizer
        isVisible={selected}
        minWidth={SYSTEM_BOUNDARY.minWidth}
        minHeight={SYSTEM_BOUNDARY.minHeight}
        handleClassName="w-2 h-2 border border-primary rounded bg-white"
        lineClassName="border border-primary"
        onResizeStart={() => {
          setNodes(nds => nds.map(n => (n.id === nodeId ? { ...n, draggable: false } : n)));
        }}
        onResizeEnd={() => {
          setNodes(nds => nds.map(n => (n.id === nodeId ? { ...n, draggable: true } : n)));
        }}
      />

      <div className="text-foreground absolute top-1 left-2 flex items-center gap-2 text-xs">
        <EditableLabel
          value={data?.title}
          fallback="System"
          onCommit={handleCommit}
          classNames={{
            wrapperClassName: 'font-semibold',
            inputClassName: 'w-40 text-xs font-semibold',
          }}
          asInput
        />
      </div>

      <div
        className="h-[calc(100% - 32px)] mt-8 w-full p-2"
        onPointerDown={e => e.stopPropagation()}
      />
    </div>
  );
});
