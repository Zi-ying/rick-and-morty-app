import Chip from '@/components/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { Filters } from "@/types/filters";

interface CharacterChipsProps {
  filters: Filters;
  className?: string;
  onClearOne: (filter: keyof Filters) => void;
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
      {filters.characterName && (
        <Chip
          name="Name"
          value={filters.characterName}
          onClick={() => onClearOne("characterName")}
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
      {filters.characterType && (
        <Chip
          name="Type"
          value={filters.characterType}
          onClick={() => onClearOne("characterType")}
          disabled={disabled}
        />
      )}

      {(filters.characterName ||
        filters.characterType ||
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
