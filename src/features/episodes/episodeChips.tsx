import Chip from '@/components/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { EpisodeFilters } from './types';

interface EpisodeChipsProps {
  filters: EpisodeFilters;
  className?: string;
  onClearOne: (filter: keyof EpisodeFilters) => void;
  onClearAll: () => void;
}

const EpisodeChips = ({
  filters,
  className,
  onClearAll,
  onClearOne,
}: EpisodeChipsProps) => {
  return (
    <div className={cn("py-2 space-x-2 space-y-2", className)}>
      {filters.name && (
        <Chip
          name="Episode name"
          value={filters.name}
          onClick={() => onClearOne("name")}
        />
      )}
      {filters.episode && (
        <Chip
          name="Episode number"
          value={filters.episode}
          onClick={() => onClearOne("episode")}
        />
      )}
      {(filters.episode || filters.episode) && (
        <Button variant="outline" size="sm" onClick={onClearAll}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default EpisodeChips;
