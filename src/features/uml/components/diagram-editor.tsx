'use client';

import { Background, Controls, MiniMap, ReactFlow, ReactFlowProvider } from 'reactflow';

import type { DiagramData } from '@/features/uml/schemas';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';

import { Toolbar } from '@/features/uml/components/toolbar';
import { DownloadMenu } from '@/features/uml/components/toolbar/download-menu';
import { edgeTypes, nodeTypes } from '@/features/uml/config';
import { useDiagramEditor } from '@/features/uml/hooks';

const DiagramEditorInner = ({
  diagramId,
  initialData,
}: {
  diagramId: string;
  initialData: DiagramData | null;
}) => {
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
  } = useDiagramEditor(initialData);

  return (
    <div className="relative flex h-full w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className="min-w-30"
          defaultSize={20}
        >
          <Toolbar
            selectedEdgeType={selectedEdgeType}
            onEdgeTypeChange={setSelectedEdgeType}
            onAddActor={addActorNode}
            onAddUseCase={addUseCaseNode}
            onAddNote={addNoteNode}
            onAddBoundary={addSystemBoundaryNode}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            connectionRadius={Infinity}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
          >
            <DownloadMenu />
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export const DiagramEditor = ({
  diagramId,
  initialData,
}: {
  diagramId: string;
  initialData: DiagramData | null;
}) => (
  <ReactFlowProvider>
    <DiagramEditorInner
      diagramId={diagramId}
      initialData={initialData}
    />
  </ReactFlowProvider>
);
