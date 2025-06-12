import Chip from '@/components/chip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { EpisodeFilters } from './types';

interface EpisodeChipsProps {
  filters: EpisodeFilters;
  className?: string;
  onClearOne: (filter: keyof EpisodeFilters) => void;
  onClearAll: () => void;
  disabled?: boolean;
}

type FilterConfig = {
  key: keyof EpisodeFilters;
  label: string;
};

const FILTER_CONFIGS: FilterConfig[] = [
  { key: 'name', label: 'Episode name' },
  { key: 'episode', label: 'Episode number' },
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

const EpisodeChips = ({
  filters,
  className,
  onClearAll,
  onClearOne,
  disabled,
}: EpisodeChipsProps) => {
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

export default EpisodeChips;
