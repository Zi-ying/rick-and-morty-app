import Chip from '@/components/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { Filters } from "@/types/filters";

interface EpisodeChipsProps {
  filters: Filters;
  className?: string;
  onClearOne: (filter: keyof Filters) => void;
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
      {filters.episodeName && (
        <Chip
          name="Episode name"
          value={filters.episodeName}
          onClick={() => onClearOne("episodeName")}
        />
      )}
      {filters.episode && (
        <Chip
          name="Episode number"
          value={filters.episode}
          onClick={() => onClearOne("episode")}
        />
      )}
      {(filters.episode || filters.episodeName) && (
        <Button variant="outline" size="sm" onClick={onClearAll}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default EpisodeChips;
