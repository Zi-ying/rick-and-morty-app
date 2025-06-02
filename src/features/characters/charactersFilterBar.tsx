import { SelectInput } from '../inputs';
import CharacterChips from './characterChips';
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
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 text-white w-full p-4">
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
      <CharacterChips
        filters={filters}
        onClearOne={onClear}
        onClearAll={onReset}
        className='self-center'
      />
    </>
  );
};

export default CharactersFilterBar;
