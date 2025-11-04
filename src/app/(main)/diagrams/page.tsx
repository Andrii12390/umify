import { Suspense } from 'react';

import { DiagramsGrid } from '@/features/diagram/components/grid/diagrams-grid';
import { DiagramsSkeleton } from '@/features/diagram/components/grid/diagrams-skeleton';

function DiagramsPage() {
  return (
    <Suspense fallback={<DiagramsSkeleton />}>
      <DiagramsGrid />
    </Suspense>
  );
}

export default DiagramsPage;
