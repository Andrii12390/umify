'use client';

import {
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
} from 'reactflow';

import { Toolbar } from '@/features/uml/components/toolbar';
import { edgeTypes, nodeTypes } from '@/features/uml/config';
import { useDiagramEditor } from '@/features/uml/hooks';

import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';

const DiagramEditorInner = () => {
  const {
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
  } = useDiagramEditor();

  return (
    <div className="relative h-full w-full">
      <Toolbar
        selectedEdgeType={selectedEdgeType}
        onEdgeTypeChange={setSelectedEdgeType}
        onAddActor={addActorNode}
        onAddUseCase={addUseCaseNode}
        onAddNote={addNoteNode}
        onAddBoundary={addSystemBoundaryNode}
      />

      <ReactFlow
        connectionMode={ConnectionMode.Loose}
        nodes={nodes}
        edges={edges}
        connectionRadius={1}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export const DiagramEditor = () => (
  <ReactFlowProvider>
    <DiagramEditorInner />
  </ReactFlowProvider>
);
