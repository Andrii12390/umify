import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

import { filter, map } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import {
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  MarkerType,
  type OnConnectStartParams,
} from 'reactflow';

import type { DiagramData } from '@/features/uml/schemas';

import type { EdgeType, LabelEdgeData } from '../types';

import { CLASS_NODE, EDGE_COLORS, EDGE_VARIANTS, SYSTEM_BOUNDARY } from '../constants';
import { createCenteredNodePosition, createNodeWithData } from '../utils/create-node';
import { withUpdatedNodesData } from '../utils/node-data';

const DELETE_KEYS = ['Delete', 'Backspace'] as const;
const INPUT_TAG_NAMES = ['TEXTAREA', 'INPUT'] as const;

type UseDiagramEditorResult = {
  nodes: Node[];
  edges: Edge<LabelEdgeData>[];
  selectedEdgeType: EdgeType;
  setSelectedEdgeType: (type: EdgeType) => void;
  onNodesChange: ReturnType<typeof useNodesState>[2];
  onEdgesChange: ReturnType<typeof useEdgesState<LabelEdgeData>>[2];
  onConnect: (params: Connection) => void;
  onConnectStart: (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => void;
  onConnectEnd: () => void;
  addActorNode: () => void;
  addUseCaseNode: () => void;
  addNoteNode: () => void;
  addSystemBoundaryNode: () => void;
  addClassNode: () => void;
};

export const useDiagramEditor = (initialData: DiagramData | null): UseDiagramEditorResult => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<LabelEdgeData>([]);
  const [selectedEdgeType, setSelectedEdgeType] = useState<EdgeType>('association');
  const [connectStart, setConnectStart] = useState<OnConnectStartParams | null>(null);

  const reactFlow = useReactFlow();

  useEffect(() => {
    if (!initialData || !reactFlow) return;

    const nodesWithStyle = initialData.nodes.map(node => {
      const hasDimensions = node.width != null && node.height != null;

      return {
        ...node,
        style: hasDimensions
          ? {
              ...(node.style || {}),
              width: node.width,
              height: node.height,
              zIndex: node.type === 'systemBoundary' ? -1 : 100,
            }
          : node.style,
      };
    });

    setNodes(nodesWithStyle);
    setEdges(initialData.edges as Edge<LabelEdgeData>[]);

    reactFlow.setViewport(initialData.viewport);
  }, [initialData, reactFlow]);

  const onEdgeLabelChange = useCallback(
    (edgeId: string, label: string | undefined) => {
      setEdges(eds =>
        eds.map(e => {
          if (e.id !== edgeId) return e;
          const hasLabel = label && label.trim();
          return {
            ...e,
            label: hasLabel || undefined,
            data: { ...e.data, labelDeleted: !hasLabel },
          };
        }),
      );
    },
    [setEdges],
  );

  const onChangeLabel = useCallback(
    (id: string, label: string) => {
      setNodes(nds => withUpdatedNodesData(nds, id, data => ({ ...data, label })));
    },
    [setNodes],
  );

  const onChangeText = useCallback(
    (id: string, text: string) => {
      setNodes(nds => withUpdatedNodesData(nds, id, data => ({ ...data, text })));
    },
    [setNodes],
  );

  const onChangeTitle = useCallback(
    (id: string, title: string) => {
      setNodes(nds => withUpdatedNodesData(nds, id, data => ({ ...data, title })));
    },
    [setNodes],
  );

  const onChangeClassName = useCallback(
    (id: string, className: string) => {
      setNodes(nds => withUpdatedNodesData(nds, id, data => ({ ...data, className })));
    },
    [setNodes],
  );

  const onChangeClassAttributes = useCallback(
    (id: string, attributes: string) => {
      setNodes(nds => withUpdatedNodesData(nds, id, data => ({ ...data, attributes })));
    },
    [setNodes],
  );

  const onChangeClassMethods = useCallback(
    (id: string, methods: string) => {
      setNodes(nds => withUpdatedNodesData(nds, id, data => ({ ...data, methods })));
    },
    [setNodes],
  );

  const makeData = useCallback(
    () => ({
      onChangeLabel,
      onChangeText,
      onChangeTitle,
      onEdgeLabelChange,
      onChangeClassName,
      onChangeClassAttributes,
      onChangeClassMethods,
    }),
    [
      onChangeLabel,
      onChangeText,
      onChangeTitle,
      onEdgeLabelChange,
      onChangeClassName,
      onChangeClassAttributes,
      onChangeClassMethods,
    ],
  );

  const onConnectStart = useCallback(
    (_: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => {
      setConnectStart(params);
    },
    [],
  );

  const onConnectEnd = useCallback(() => {
    setConnectStart(null);
  }, []);

  const makeMarker = (type: MarkerType) => ({
    type,
    color: EDGE_COLORS.default,
    ...(type === MarkerType.Arrow ? { strokeWidth: 1 } : {}),
  });

  const onConnect = useCallback(
    (params: Connection) => {
      const { source, target, sourceHandle, targetHandle } = params;
      if (!source || !target) return;

      const variant = EDGE_VARIANTS[selectedEdgeType];
      const markerType = variant.markerType;
      const marker = markerType ? makeMarker(markerType) : undefined;

      const newEdge: Edge<LabelEdgeData> = {
        id: `edge-${crypto.randomUUID()}`,
        type: selectedEdgeType,
        source,
        target,
        sourceHandle,
        targetHandle,
        data: { onEdgeLabelChange, autoLabel: variant.autoLabel, labelDeleted: false },
        style: {
          stroke: EDGE_COLORS.default,
          strokeWidth: 2,
        },
        ...(marker && {
          [connectStart?.handleType === 'target' ? 'markerStart' : 'markerEnd']: marker,
        }),
      };

      setEdges(eds => addEdge(newEdge, eds));
    },
    [selectedEdgeType, connectStart, setEdges, onEdgeLabelChange],
  );

  const addNode = useCallback(
    (
      idPrefix: string,
      type: Node['type'],
      options?: { width?: number; height?: number; style?: Node['style'] },
    ) => {
      const position = createCenteredNodePosition(reactFlow);
      const node = createNodeWithData({
        idPrefix,
        type,
        position,
        data: makeData(),
        ...options,
      });
      setNodes(nds => [...nds, node]);
    },
    [reactFlow, makeData, setNodes],
  );

  const addActorNode = useCallback(() => addNode('actor', 'actor'), [addNode]);
  const addUseCaseNode = useCallback(() => addNode('usecase', 'useCase'), [addNode]);
  const addNoteNode = useCallback(() => addNode('note', 'note'), [addNode]);
  const addSystemBoundaryNode = useCallback(() => {
    const { defaultWidth: width, defaultHeight: height } = SYSTEM_BOUNDARY;
    addNode('boundary', 'systemBoundary', {
      width,
      height,
      style: { width, height, zIndex: -1 },
    });
  }, [addNode]);

  const addClassNode = useCallback(() => {
    const { defaultWidth: width, defaultHeight: height, minWidth, minHeight } = CLASS_NODE;
    addNode('class', 'class', {
      width,
      height,
      style: {
        width,
        height,
        minWidth,
        minHeight,
      },
    });
  }, [addNode]);

  const deleteSelected = useCallback(() => {
    const selectedNodes = filter(nodes, n => n.selected);
    const selectedEdges = filter(edges, e => e.selected);
    const nodeIds = new Set(map(selectedNodes, 'id'));
    const edgeIds = new Set(map(selectedEdges, 'id'));

    setNodes(nds => filter(nds, n => !nodeIds.has(n.id)));
    setEdges(eds =>
      filter(eds, e => !edgeIds.has(e.id) && !nodeIds.has(e.source) && !nodeIds.has(e.target)),
    );
  }, [nodes, edges, setNodes, setEdges]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInputField =
        target && INPUT_TAG_NAMES.includes(target.tagName as (typeof INPUT_TAG_NAMES)[number]);
      if (DELETE_KEYS.includes(event.key as (typeof DELETE_KEYS)[number]) && !isInputField) {
        event.preventDefault();
        deleteSelected();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected]);

  return {
    nodes,
    edges,
    selectedEdgeType,
    setSelectedEdgeType,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onConnectStart,
    onConnectEnd,
    addActorNode,
    addUseCaseNode,
    addNoteNode,
    addSystemBoundaryNode,
    addClassNode,
  };
};
