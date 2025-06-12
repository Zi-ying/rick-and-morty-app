import Chip from '@/components/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { LocationFilters } from './types';

interface LocationChipsProps {
  filters: LocationFilters;
  className?: string;
  onClearOne: (filter: keyof LocationFilters) => void;
  onClearAll: () => void;
}

const LocationChips = ({
  filters,
  className,
  onClearAll,
  onClearOne,
}: LocationChipsProps) => {
  return (
    <div className={cn("py-2 space-x-2 space-y-2", className)}>
      {filters.name && (
        <Chip
          name="Location name"
          value={filters.name}
          onClick={() => onClearOne("name")}
        />
      )}
      {filters.type && (
        <Chip
          name="Location type"
          value={filters.type}
          onClick={() => onClearOne("type")}
        />
      )}
      {filters.dimension && (
        <Chip
          name="Dimension"
          value={filters.dimension}
          onClick={() => onClearOne("dimension")}
        />
      )}

      {(filters.dimension || filters.name || filters.type) && (
        <Button variant="outline" size="sm" onClick={onClearAll}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default LocationChips;
