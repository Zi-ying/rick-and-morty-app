import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addFilter, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useDebounce } from '@/utils/use-debounce';

import { characterTypeOptions, genderOptions, speciesOptions, statusOptions } from '../characters/options';
import ExpansionButton from '../expansionButton';
import { FilterBadges, SelectInput } from '../inputs';
import SearchNavigation from '../searchNavigation';

import type { Filters } from "@/types/filters";

interface CharactersInputsProps {
  filters: Filters;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CharactersInputs = ({
  filters,
  setCurrentPage,
}: CharactersInputsProps) => {
  const [name, setName] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();

  const timeout = 500;

  const debouncedNameValue = useDebounce(name, timeout);

  useEffect(() => {
    dispatch(addFilter({ key: "characterName", value: debouncedNameValue }));
  }, [debouncedNameValue, dispatch]);

  const setFilters = (key: keyof Filters, value: string) => {
    dispatch(addFilter({ key, value }));
    setCurrentPage(1);
  };

  const setSearchFilter = (value: string) => {
    setName(value);
    setCurrentPage(1);
  };

  const handleClear = (filter: keyof Filters) => {
    dispatch(removeOneFilter(filter));
    setCurrentPage(1);
    if (filter === "characterName") {
      setName("");
    }
  };

  const onResetClick = () => {
    dispatch(resetFilters());
    setName("");
    setCurrentPage(1);
  };

  return (
    <>
      <SearchNavigation
        placeholder="Search by character name"
        value={name}
        onChange={(e) => setSearchFilter(e.target.value)}
      >
        <ExpansionButton
          expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </SearchNavigation>

      {/* Filter Bar */}
      <div
        className={
          isExpanded ? "grid md:grid-cols-4 gap-2 text-white m-auto" : "hidden"
        }
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
          className="w-[220px]"
        />
      </div>
      <FilterBadges
        filters={filters}
        onClearOne={handleClear}
        onClearAll={onResetClick}
        className="flex flex-wrap gap-2 justify-center items-center"
      />
    </>
  );
};

export default CharactersInputs;
