import { useState } from 'react';

import ExpansionButton from '../expansionButton';
import { FilterBadges, SelectInput } from '../inputs';
import { characterTypeOptions, genderOptions, speciesOptions, statusOptions } from './options';

import type { Filters } from "@/types/filters";
interface CharactersFilterBarProps {
  filters: Filters;
  setFilters: (key: keyof Filters, e: string) => void;
  onClear: (key: keyof Filters) => void;
  onReset: () => void;
}

const CharactersFilterBar = ({
  filters,
  setFilters,
  onClear,
  onReset,
}: CharactersFilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <div className="@max-md:grid md:flex gap-2">
        <div
          className={isExpanded ? "md:flex gap-2 text-white w-full" : "hidden"}
        >
          <SelectInput
            placeholder="Status"
            value={filters.status}
            data={statusOptions}
            onChange={(e) => setFilters("status", e)}
            className="w-full"
          />
          <SelectInput
            placeholder="Gender"
            value={filters.gender}
            data={genderOptions}
            onChange={(e) => setFilters("gender", e)}
            className="w-full"
          />
          <SelectInput
            placeholder="Species"
            value={filters.species}
            data={speciesOptions}
            onChange={(e) => setFilters("species", e)}
            className="w-full"
          />
          <SelectInput
            placeholder="Sub-species"
            value={filters.characterType}
            data={characterTypeOptions}
            onChange={(e) => setFilters("characterType", e)}
            className="w-full"
          />
        </div>
        <div className='justify-self-center'>
          <ExpansionButton
            expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
      <FilterBadges
        filters={filters}
        onClearOne={onClear}
        onClearAll={onReset}
        className="flex flex-wrap gap-2 justify-center items-center"
      />
    </>
  );
};

export default CharactersFilterBar;
