import { times } from 'lodash-es';

import { Skeleton } from '@/components/ui/skeleton';
const SKELETON_COUNT = 8;

export const DiagramsSkeleton = () => (
  <div className="flex flex-wrap gap-4 overflow-y-auto p-4 lg:p-6">
    {times(SKELETON_COUNT, idx => (
      <div
        className="bg-card flex size-50 flex-col overflow-hidden rounded-lg shadow-sm md:size-55"
        key={idx}
      >
        <Skeleton className="h-full w-full rounded-none!" />
        <div className="space-y-2 px-3 py-2.5">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>
      </div>
    ))}
  </div>
);
