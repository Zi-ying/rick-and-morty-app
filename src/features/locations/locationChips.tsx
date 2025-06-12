import Chip from '@/components/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { LocationFilters } from './types';

interface LocationChipsProps {
  filters: LocationFilters;
  className?: string;
  onClearOne: (filter: keyof LocationFilters) => void;
  onClearAll: () => void;
  disabled?: boolean;
}

type FilterConfig = {
  key: keyof LocationFilters;
  label: string;
};

const FILTER_CONFIGS: FilterConfig[] = [
  { key: 'name', label: 'Location name' },
  { key: 'type', label: 'Location type' },
  { key: 'dimension', label: 'Dimension' },
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

const LocationChips = ({
  filters,
  className,
  onClearAll,
  onClearOne,
  disabled,
}: LocationChipsProps) => {
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

export default LocationChips;
