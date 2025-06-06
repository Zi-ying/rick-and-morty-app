import { SelectInput } from '../inputs';
import CharacterChips from './characterChips';
import { characterTypeOptions, genderOptions, speciesOptions, statusOptions } from './options';

import type { Filters } from "@/types/filters";

type FilterOption = {
  label: string;
  value: string;
};

type FilterField = {
  key: keyof Filters;
  placeholder: string;
  options: FilterOption[];
};

const filterFields: FilterField[] = [
  { key: "status", placeholder: "Status", options: statusOptions },
  { key: "gender", placeholder: "Gender", options: genderOptions },
  { key: "species", placeholder: "Species", options: speciesOptions },
  {
    key: "characterType",
    placeholder: "Sub-species",
    options: characterTypeOptions,
  },
];

interface CharactersFilterBarProps {
  filters: Filters;
  setFilters: (key: keyof Filters, e: string) => void;
  onClear: (key: keyof Filters) => void;
  onReset: () => void;
  isLoading?: boolean;
}

const CharactersFilterBar = ({
  filters,
  setFilters,
  onClear,
  onReset,
  isLoading = false,
}: CharactersFilterBarProps) => {
  return (
    <>
      <div
        className="flex flex-col md:flex-row gap-2 text-white w-full p-4"
        role="toolbar"
        aria-label="Character filters"
      >
        {filterFields.map(({ key, placeholder, options }) => (
          <SelectInput
            key={key}
            placeholder={placeholder}
            value={filters[key]}
            data={options}
            onChange={(e) => setFilters(key, e)}
            className="w-full"
            disabled={isLoading}
            aria-label={`Filter by ${placeholder.toLowerCase()}`}
          />
        ))}
      </div>
      <CharacterChips
        filters={filters}
        onClearOne={onClear}
        onClearAll={onReset}
        className="self-center"
        disabled={isLoading}
      />
    </>
  );
};

export default CharactersFilterBar;
