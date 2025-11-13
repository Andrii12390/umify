import { getDiagram } from '@/features/uml/actions';
import { PageBack } from '@/features/uml/components/common';
import { DiagramEditor } from '@/features/uml/components/diagram-editor';

async function DiagramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const diagram = await getDiagram(id);

  const initialData = diagram.success ? diagram.data : null;
  return (
    <>
      <PageBack />
      <DiagramEditor
        diagramId={id}
        initialData={initialData}
      />
    </>
  );
}

export default DiagramPage;
