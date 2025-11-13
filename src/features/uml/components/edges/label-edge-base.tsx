import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { EdgeLabelRenderer, getBezierPath, type EdgeProps } from 'reactflow';

import type { LabelEdgeData } from '@/features/uml/types';

import { EDGE_COLORS } from '@/features/uml/constants';
import { cn } from '@/lib/utils';

export type LabelEdgeProps = EdgeProps<LabelEdgeData> & {
  dashed?: boolean;
  autoLabel?: string;
};

export const LabelEdgeBase = memo(function LabelEdgeBase(props: LabelEdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
    data,
    selected,
    dashed = false,
    markerStart,
    markerEnd,
    autoLabel,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const currentLabel = typeof label === 'string' ? label : '';
  const [labelValue, setLabelValue] = useState(currentLabel);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  useEffect(() => {
    if (!isEditing && labelValue !== currentLabel) {
      const timeoutId = setTimeout(() => {
        setLabelValue(currentLabel);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [currentLabel, isEditing, labelValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isEditing]);

  const startEdit = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const commit = useCallback(() => {
    setIsEditing(false);
    data?.onEdgeLabelChange?.(id, labelValue || undefined);
  }, [data, id, labelValue]);

  const cancel = useCallback(() => {
    setIsEditing(false);
    setLabelValue(currentLabel);
  }, [currentLabel]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        commit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        cancel();
      }
    },
    [commit, cancel],
  );

  const strokeColor = selected ? EDGE_COLORS.selected : EDGE_COLORS.default;
  const strokeWidth = selected ? 3 : 2;
  const userLabel = labelValue.trim();
  const labelDeleted = data?.labelDeleted ?? false;
  const showAutoLabel = autoLabel && !labelDeleted && !userLabel;
  const displayLabel = userLabel || (showAutoLabel ? `«${autoLabel}»` : '');

  return (
    <>
      <path
        d={edgePath}
        fill="none"
        strokeWidth={20}
        stroke="transparent"
        className="react-flow__edge-interaction"
      />
      <path
        id={id}
        className="react-flow__edge-path transition-[stroke,stroke-width]"
        d={edgePath}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        fill="none"
        strokeDasharray={dashed ? '5,5' : undefined}
        markerStart={markerStart}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto absolute z-1000"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          onDoubleClick={startEdit}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={String(labelValue)}
              onChange={e => setLabelValue(e.target.value)}
              onBlur={commit}
              onPointerDown={e => e.stopPropagation()}
              onKeyDown={handleKeyDown}
              className="border-input bg-background cursor-text rounded border px-2 py-1 text-xs shadow-sm outline-none"
              placeholder="Press Enter or leave empty to remove"
            />
          ) : (
            <>
              {displayLabel && (
                <div
                  className={cn(
                    'border-input bg-background cursor-text rounded border px-2 py-1 text-xs shadow-sm select-none',
                    selected && 'ring-primary ring-2',
                  )}
                >
                  {displayLabel}
                </div>
              )}
              {!displayLabel && selected && (
                <div className="border-muted-foreground bg-background text-muted-foreground cursor-text rounded border border-dashed px-2 py-1 text-[10px] shadow-sm select-none">
                  Add label
                </div>
              )}
            </>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
});
