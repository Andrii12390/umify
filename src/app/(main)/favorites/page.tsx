import type { Metadata } from 'next';

import { Suspense } from 'react';

import { Header } from '@/components/header';
import { DiagramsGrid } from '@/features/diagram/components/grid/diagrams-grid';
import { DiagramsSkeleton } from '@/features/diagram/components/grid/diagrams-skeleton';

export const metadata: Metadata = {
  title: 'Favorites',
  description: 'Find your favorite diagrams here',
};

export const dynamic = 'force-dynamic';

function FavoritesPage() {
  return (
    <>
      <Header title="My Favorites" />
      <Suspense fallback={<DiagramsSkeleton />}>
        <DiagramsGrid
          fetchFavorites={true}
          showCreateCard={false}
        />
      </Suspense>
    </>
  );
}

export default FavoritesPage;
