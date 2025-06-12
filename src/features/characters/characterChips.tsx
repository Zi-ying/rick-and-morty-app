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

type FilterConfig = {
  key: keyof CharacterFilters;
  label: string;
};

const FILTER_CONFIGS: FilterConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'gender', label: 'Gender' },
  { key: 'status', label: 'Status' },
  { key: 'species', label: 'Species' },
  { key: 'type', label: 'Type' },
];

const FilterChip = ({
  config,
  value,
  onClear,
  disabled,
}: {
  config: FilterConfig;
  value: string;
  onClear: () => void;
  disabled?: boolean;
}) => (
  <Chip
    name={config.label}
    value={value}
    onClick={onClear}
    disabled={disabled}
  />
);

const CharacterChips = ({
  filters,
  className,
  onClearAll,
  onClearOne,
  disabled,
}: CharacterChipsProps) => {
  const hasActiveFilters = FILTER_CONFIGS.some(
    (config) => filters[config.key]
  );

  return (
    <div className={cn("py-2 space-x-2 space-y-2", className)}>
      {FILTER_CONFIGS.map((config) => {
        const value = filters[config.key];
        if (!value) return null;

        return (
          <FilterChip
            key={config.key}
            config={config}
            value={value}
            onClear={() => onClearOne(config.key)}
            disabled={disabled}
          />
        );
      })}

      {hasActiveFilters && (
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
