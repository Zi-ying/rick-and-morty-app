import Chip from '@/components/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { Filters } from "@/types/filters";

interface LocationChipsProps {
  filters: Filters;
  className?: string;
  onClearOne: (filter: keyof Filters) => void;
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
      {filters.locationName && (
        <Chip
          name="Location name"
          value={filters.locationName}
          onClick={() => onClearOne("locationName")}
        />
      )}
      {filters.locationType && (
        <Chip
          name="Location type"
          value={filters.locationType}
          onClick={() => onClearOne("locationType")}
        />
      )}
      {filters.dimension && (
        <Chip
          name="Dimension"
          value={filters.dimension}
          onClick={() => onClearOne("dimension")}
        />
      )}

      {(filters.dimension || filters.locationName || filters.locationType) && (
        <Button variant="outline" size="sm" onClick={onClearAll}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default LocationChips;
