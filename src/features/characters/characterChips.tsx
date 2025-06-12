import Chip from '@/components/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { CharacterFilters } from './types';

interface CharacterChipsProps {
  filters: CharacterFilters;
  className?: string;
  onClearOne: (filter: keyof CharacterFilters) => void;
  onClearAll: () => void;
  disabled?: boolean;
}

const CharacterChips = ({
  filters,
  className,
  onClearAll,
  onClearOne,
  disabled,
}: CharacterChipsProps) => {
  return (
    <div className={cn("py-2 space-x-2 space-y-2", className)}>
      {filters.name && (
        <Chip
          name="Name"
          value={filters.name}
          onClick={() => onClearOne("name")}
          disabled={disabled}
        />
      )}
      {filters.gender && (
        <Chip
          name="Gender"
          value={filters.gender}
          onClick={() => onClearOne("gender")}
          disabled={disabled}
        />
      )}
      {filters.status && (
         <Chip
          name="Status"
          value={filters.status}
          onClick={() => onClearOne("status")}
          disabled={disabled}
        />
      )}
      {filters.species && (
         <Chip
          name="Species"
          value={filters.species}
          onClick={() => onClearOne("species")}
          disabled={disabled}
        />
      )}
      {filters.type && (
        <Chip
          name="Type"
          value={filters.type}
          onClick={() => onClearOne("type")}
          disabled={disabled}
        />
      )}

      {(filters.name ||
        filters.type ||
        filters.gender ||
        filters.species ||
        filters.status) && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          disabled={disabled}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default CharacterChips;
