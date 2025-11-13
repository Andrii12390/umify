import type { Node } from 'reactflow';

import type { EdgeType } from '../types';

type ConnectionRule = {
  valid: boolean;
  message?: string;
};

const CONNECTION_RULES: Record<
  EdgeType,
  (sourceType: string | undefined, targetType: string | undefined) => ConnectionRule
> = {
  association: (sourceType, targetType) => {
    const isValid =
      (sourceType === 'actor' && targetType === 'useCase') ||
      (sourceType === 'useCase' && targetType === 'actor');
    return isValid
      ? { valid: true }
      : { valid: false, message: 'Association allowed only between Actor and Use Case' };
  },
  include: (sourceType, targetType) => {
    const isValid = sourceType === 'useCase' && targetType === 'useCase';
    return isValid
      ? { valid: true }
      : { valid: false, message: 'Include allowed only between Use Cases' };
  },
  extend: (sourceType, targetType) => {
    const isValid = sourceType === 'useCase' && targetType === 'useCase';
    return isValid
      ? { valid: true }
      : { valid: false, message: 'Extend allowed only between Use Cases' };
  },
  generalization: (sourceType, targetType) => {
    const isValid =
      (sourceType === 'actor' && targetType === 'actor') ||
      (sourceType === 'useCase' && targetType === 'useCase');
    return isValid
      ? { valid: true }
      : { valid: false, message: 'Generalization allowed only between same node types' };
  },
};

export const isValidConnection = (
  sourceNode: Node | null,
  targetNode: Node | null,
  edgeType: EdgeType,
): ConnectionRule => {
  if (!sourceNode || !targetNode) {
    return { valid: false, message: 'Source and target nodes are required' };
  }

  const rule = CONNECTION_RULES[edgeType];
  return rule
    ? rule(sourceNode.type, targetNode.type)
    : { valid: false, message: 'Unknown connection type' };
};
