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

import type {
  EdgeTerminatorSettings,
  EdgeTerminatorShape,
  LabelEdgeData,
} from '@/features/uml/types';

import { EDGE_COLORS } from '@/features/uml/constants';
import { cn } from '@/lib/utils';

export type LabelEdgeProps = EdgeProps<LabelEdgeData> & {
  dashed?: boolean;
  autoLabel?: string;
  terminators?: EdgeTerminatorSettings;
};

const TerminatorIcon = ({ shape, color }: { shape: EdgeTerminatorShape; color: string }) => {
  const commonProps = {
    width: 12,
    height: 12,
    viewBox: '-12 -12 24 24',
  };

  switch (shape) {
    case 'triangleOutline':
      return (
        <svg
          {...commonProps}
          fill="none"
        >
          <polygon
            points="10,0 -8,-6 -8,6"
            stroke={color}
            strokeWidth={2}
            fill={'#ffffff'}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'triangleFilled':
      return (
        <svg {...commonProps}>
          <polygon
            points="10,0 -8,-6 -8,6"
            fill={color}
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'diamondOutline':
      return (
        <svg
          {...commonProps}
          fill="hsl(var(--background))"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
        >
          <polygon points="14,0 0,5 -10,0 0,-5" />
        </svg>
      );

    case 'diamondFilled':
      return (
        <svg
          {...commonProps}
          fill={color}
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        >
          <polygon points="14,0 0,5 -10,0 0,-5" />
        </svg>
      );

    default:
      return null;
  }
};

type TerminatorPosition = 'start' | 'end';

type TerminatorOverlayProps = {
  shape: EdgeTerminatorShape;
  position: TerminatorPosition;
  baseX: number;
  baseY: number;
  angle: number;
  color: string;
};
const TerminatorOverlay = ({ shape, baseX, baseY, angle, color }: TerminatorOverlayProps) => {
  const rotateDeg = (angle * 180) / Math.PI;

  return (
    <div
      className="pointer-events-none absolute z-[1000]"
      style={{
        transformOrigin: 'center',
        transform: `translate(-50%, -50%) translate(${baseX}px, ${baseY}px) rotate(${rotateDeg}deg)`,
      }}
    >
      <TerminatorIcon
        shape={shape}
        color={color}
      />
    </div>
  );
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
    terminators,
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
  const directionAngle = Math.atan2(targetY - sourceY, targetX - sourceX);

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
      {(terminators?.start || terminators?.end) && (
        <EdgeLabelRenderer>
          <>
            {terminators?.start && (
              <TerminatorOverlay
                shape={terminators.start}
                position="start"
                baseX={sourceX}
                baseY={sourceY}
                angle={directionAngle}
                color={strokeColor}
              />
            )}
            {terminators?.end && (
              <TerminatorOverlay
                shape={terminators.end}
                position="end"
                baseX={targetX}
                baseY={targetY}
                angle={directionAngle}
                color={strokeColor}
              />
            )}
          </>
        </EdgeLabelRenderer>
      )}
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
