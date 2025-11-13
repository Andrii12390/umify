import { memo, useCallback } from 'react';
import { useNodeId, type NodeProps } from 'reactflow';

import type { NoteData } from '@/features/uml/types';

import { EditableLabel } from '@/features/uml/components/edges';
import { DIAGRAM_CLS, NOTE } from '@/features/uml/constants';
import { cn } from '@/lib/utils';

export const NoteNode = memo(function NoteNode({ data, selected }: NodeProps<NoteData>) {
  const nodeId = useNodeId()!;

  const handleCommit = useCallback(
    (text: string) => {
      data?.onChangeText?.(nodeId, text);
    },
    [data, nodeId],
  );

  return (
    <div
      className={cn(DIAGRAM_CLS.noteWrapper, selected && DIAGRAM_CLS.nodeSelected)}
      style={{
        minWidth: NOTE.minWidth,
        minHeight: NOTE.minHeight,
      }}
    >
      <div className="p-2">
        <EditableLabel
          value={data?.text}
          onCommit={handleCommit}
          classNames={{
            wrapperClassName: 'min-h-8 text-xs',
            inputClassName: 'text-xs',
          }}
          rows={3}
          placeholder="Double click to edit"
          allowEmpty
        />
      </div>
    </div>
  );
});
