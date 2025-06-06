import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

import type { Character } from './types';

const StatusCircle = (({ status }: { status: Character['status'] }) => (
  <Circle
    className={cn(
      "h-2.5 stroke-2.5",
      status === "Alive" && "stroke-green-400 fill-green-400",
      status === "unknown" && "stroke-green-400",
      status === "Dead" && "stroke-slate-700 fill-slate-700"
    )}
    aria-label={`Status: ${status}`}
  />
));

export default StatusCircle;
