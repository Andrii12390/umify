import { MarkerType } from 'reactflow';

import type { EdgeTerminatorSettings, EdgeType } from '../types';

export const DIAGRAM_CLS = {
  nodeSelected: 'ring-2 ring-primary',
  noteWrapper: 'relative bg-background transition-all select-none',
  systemBoundary:
    'w-full h-full z-0 relative rounded border-2 border-border bg-background/50 transition-all',
  toolbar:
    'absolute top-5 left-5 z-10 flex flex-col gap-3 rounded-lg bg-background p-4 shadow-lg border border-border',
  toolbarLabel: 'text-xs font-semibold text-muted-foreground uppercase tracking-wide',
  hint: 'mt-1 text-xs text-muted-foreground',
};

export const HANDLE_BASE_CLS =
  'size-2! rounded-full border-2 border-primary bg-background opacity-0 transition-opacity group-hover:opacity-100';

export const EDGE_COLORS = {
  default: 'var(--diagram-edge-color, #555)',
  selected: 'var(--diagram-edge-selected-color, #3b82f6)',
};

export const NOTE = {
  minWidth: 150,
  minHeight: 40,
};

export const SYSTEM_BOUNDARY = {
  minWidth: 200,
  minHeight: 150,
  defaultWidth: 400,
  defaultHeight: 300,
};

export const CLASS_NODE = {
  minWidth: 180,
  minHeight: 120,
  defaultWidth: 240,
  defaultHeight: 120,
};

export const EDGE_VARIANTS: Record<
  EdgeType,
  {
    dashed: boolean;
    autoLabel?: string;
    markerType?: MarkerType;
    terminators?: EdgeTerminatorSettings;
  }
> = {
  association: { dashed: false },
  include: {
    dashed: true,
    autoLabel: 'includes',
    markerType: MarkerType.Arrow,
  },
  extend: {
    dashed: true,
    autoLabel: 'extends',
    markerType: MarkerType.Arrow,
  },
  generalization: {
    dashed: false,
    markerType: MarkerType.Arrow,
  },
  inheritance: {
    dashed: false,
    terminators: {
      end: 'triangleOutline',
    },
  },
  realization: {
    dashed: true,
    terminators: {
      end: 'triangleOutline',
    },
  },
  dependency: {
    dashed: true,
    markerType: MarkerType.Arrow,
  },
  aggregation: {
    dashed: false,
    terminators: {
      start: 'diamondOutline',
    },
  },
  composition: {
    dashed: false,
    terminators: {
      start: 'diamondFilled',
    },
  },
};
