import { times } from 'lodash-es';

import { Skeleton } from '@/components/ui/skeleton';

const SKELETON_COUNT = 8;

export const DiagramsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-6 xl:grid-cols-4">
      {times(SKELETON_COUNT, () => (
        <Skeleton
          key={crypto.randomUUID()}
          className="min-h-32 rounded-lg shadow-sm"
        />
      ))}
    </div>
  );
};
