import type { EdgeProps } from 'reactflow';

import { memo } from 'react';

import type { LabelEdgeData } from '@/features/uml/types';

import { EDGE_VARIANTS } from '@/features/uml/constants';

import { LabelEdgeBase } from './label-edge-base';

const createEdgeComponent = (type: keyof typeof EDGE_VARIANTS) => {
  const variant = EDGE_VARIANTS[type];
  const Component = (props: EdgeProps<LabelEdgeData>) => (
    <LabelEdgeBase
      {...props}
      dashed={variant.dashed}
      autoLabel={variant.autoLabel}
    />
  );
  Component.displayName = `${type.charAt(0).toUpperCase() + type.slice(1)}Edge`;
  return memo(Component);
};

export const AssociationEdge = createEdgeComponent('association');
export const IncludeEdge = createEdgeComponent('include');
export const ExtendEdge = createEdgeComponent('extend');
export const GeneralizationEdge = createEdgeComponent('generalization');
