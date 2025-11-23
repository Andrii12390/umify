import { times } from 'lodash-es';

const DOTS_COUNT = 3;

export const Loader = () => (
  <span className="inline-flex items-center justify-center gap-1.5">
    {times(DOTS_COUNT, idx => (
      <span
        key={idx}
        className="bouncing-dot bg-foreground/25 size-4 rounded-[1000px]"
      />
    ))}
  </span>
);
