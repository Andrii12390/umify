import type { Node } from 'reactflow';

export const withUpdatedNodesData = (
  nodes: Node[],
  id: string,
  updater: (data: Node['data']) => Node['data'],
) =>
  nodes.map(n =>
    n.id === id
      ? {
          ...n,
          data: updater(n.data ?? {}),
        }
      : n,
  );
