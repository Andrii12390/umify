import Link from 'next/link';

import { PRIVATE_ROUTES } from '@/constants';
import { getDiagrams } from '@/features/diagram/actions';
import { CreateDiagramCard } from '@/features/diagram/components/card/create-diagram-card';
import { DiagramCard } from '@/features/diagram/components/card/diagram-card';

interface Props {
  fetchFavorites?: boolean;
  showCreateCard?: boolean;
}

export const DiagramsGrid = async ({ fetchFavorites, showCreateCard = true }: Props) => {
  const res = await getDiagrams(fetchFavorites);

  const diagrams = res.success ? res.data : [];

  return (
    <div className="lg:p-6я flex flex-wrap gap-4 overflow-y-auto p-4">
      {diagrams.map(diagram => (
        <Link
          key={diagram.id}
          href={`${PRIVATE_ROUTES.DIAGRAMS}/${diagram.id}`}
        >
          <DiagramCard {...diagram} />
        </Link>
      ))}
      {showCreateCard && <CreateDiagramCard />}
    </div>
  );
};
