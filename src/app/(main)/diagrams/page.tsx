import type { Metadata } from 'next';

import { Suspense } from 'react';

import { Header } from '@/components/header';
import { DiagramsGrid } from '@/features/diagram/components/grid/diagrams-grid';
import { DiagramsSkeleton } from '@/features/diagram/components/grid/diagrams-skeleton';

export const metadata: Metadata = {
  title: 'Diagrams',
  description: 'Manage your diagrams here',
};

function DiagramsPage() {
  return (
    <>
      <Header title="Diagrams" />
      <Suspense fallback={<DiagramsSkeleton />}>
        <DiagramsGrid />
      </Suspense>
    </>
  );
}

export default DiagramsPage;
