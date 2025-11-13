import type { useReactFlow } from 'reactflow';

import { type Node } from 'reactflow';

export const createCenteredNodePosition = (reactFlow: ReturnType<typeof useReactFlow>) => {
  const bounds = document.querySelector('.react-flow')?.getBoundingClientRect();
  const x = bounds ? bounds.width / 2 : 400;
  const y = bounds ? bounds.height / 2 : 300;

  return reactFlow.screenToFlowPosition({ x, y });
};

export const createNodeWithData = <T extends Node['data']>(config: {
  idPrefix: string;
  type: Node['type'];
  position: { x: number; y: number };
  data: T;
  width?: number;
  height?: number;
  style?: Node['style'];
}): Node<T> =>
  ({
    id: `${config.idPrefix}-${crypto.randomUUID()}`,
    ...config,
    selected: true,
  }) as Node<T>;
