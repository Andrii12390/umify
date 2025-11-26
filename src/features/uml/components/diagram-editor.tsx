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
    addClassNode,
    addPackageNode,
  } = useDiagramEditor(initialData);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full w-full"
    >
      <ResizablePanel
        className="bg-card min-w-30 overflow-y-auto!"
        defaultSize={20}
      >
        <Toolbar
          selectedEdgeType={selectedEdgeType}
          onEdgeTypeChange={setSelectedEdgeType}
          onAddActor={addActorNode}
          onAddUseCase={addUseCaseNode}
          onAddNote={addNoteNode}
          onAddBoundary={addSystemBoundaryNode}
          onAddClassNode={addClassNode}
          onAddPackage={addPackageNode}
        />
      </ResizablePanel>

      <ResizableHandle />
      <ResizablePanel className="relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          connectionRadius={20}
          fitView
        >
          <DownloadMenu diagramId={diagramId} />
          <Background />
          <Controls />
          <MiniMap className="hidden md:block" />
        </ReactFlow>
      </ResizablePanel>
    </ResizablePanelGroup>
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
