import Link from 'next/link';

import { PRIVATE_ROUTES } from '@/constants';
import { getDiagrams } from '@/features/diagram/actions';
import { CreateDiagramCard } from '@/features/diagram/components/card/create-diagram-card';
import { DiagramCard } from '@/features/diagram/components/card/diagram-card';

export const DiagramsGrid = async () => {
  const diagrams = await getDiagrams();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-6 xl:grid-cols-4">
      {diagrams?.map(diagram => (
        <Link
          key={diagram.id}
          href={`${PRIVATE_ROUTES.DIAGRAMS}/${diagram.id}`}
        >
          <DiagramCard {...diagram} />
        </Link>
      ))}
      <CreateDiagramCard />
    </div>
  );
};
