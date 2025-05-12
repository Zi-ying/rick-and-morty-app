import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CharactersList from '@/features/characters/charactersList';
import { getAllCharacters } from '@/features/characters/get-all-characters';
import { getMultipleCharacters } from '@/features/characters/get-multiple-characters';
import { characterTypeOptions, genderOptions, speciesOptions, statusOptions } from '@/features/characters/options';
import ExpansionButton from '@/features/expansionButton';
import FilterBadges from '@/features/inputs/filterBadges';
import SelectInput from '@/features/inputs/selectInput';
import PaginationList from '@/features/pagination/paginationList';
import ResultsNotFound from '@/features/resultsNotFound';
import SearchNavigation from '@/features/searchNavigation';
import { cn } from '@/lib/utils';
import { allFavorites } from '@/store/favorites-slice';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppSelector } from '@/store/redux-hooks';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Character, CharacterFilters } from "@/features/characters/types";
import type { Filters } from "@/types/filters";

const CharactersPage = () => {
  const filters: Filters = useAppSelector(allFilters);
  const keys = useAppSelector(allFavorites);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isFavoritePage, setIsFavoritePage] = useState<boolean>(false);
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

  const filtersArgs: CharacterFilters = {
    name: filters.characterName,
    gender: filters.gender,
    status: filters.status,
    species: filters.species,
    type: filters.characterType,
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["charactersData", filtersArgs, currentPage],
    queryFn: async () => getAllCharacters(filtersArgs, currentPage.toString()),
    placeholderData: keepPreviousData,
  });

  const { data: favdata, isPending: isFavDataPending } = useQuery({
    queryKey: ["multipleCharactersData", keys],
    queryFn: async () => getMultipleCharacters(keys.join()),
    placeholderData: keepPreviousData,
  });

  const value = useDebounce(name2, timeout);

  if (error) return "An error has occurred: " + error.message;

  const isCharacter = (data: Character | Character[]): data is Character => {
    return (data as Character).created !== undefined;
  };

  if (isFavoritePage) {
    if (!favdata) {
      return <ResultsNotFound />;
    }

    const newArray: Character[] = [];

    if (isCharacter(favdata)) {
      newArray.push(favdata);
    }

    if (!isCharacter(favdata) && favdata.length >= 2) {
      newArray.push(...favdata);
    }

    const filteredData = newArray.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    const sortedData = filteredData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <div className="p-2">
        <SearchNavigation
          placeholder="Search by character name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          toggled={isFavoritePage}
          onToggle={() => setIsFavoritePage(!isFavoritePage)}
        />
        {filteredData && filteredData.length !== 0 ? (
          <CharactersList data={sortedData} isPending={isFavDataPending} />
        ) : (
          <ResultsNotFound />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-2 p-2 sticky top-14 z-10 bg-home bg-fixed">
        <SearchNavigation
          placeholder="Search by character name"
          value={name}
          onChange={(e) => setSearchFilter(e.target.value)}
          toggled={isFavoritePage}
          onToggle={() => setIsFavoritePage(!isFavoritePage)}
        >
          <ExpansionButton
            expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </SearchNavigation>

        {/* Filter Bar */}
        <div
          className={cn(
            isExpanded
              ? "grid md:grid-cols-4 gap-2 text-white m-auto"
              : "hidden"
          )}
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
        {data?.info && data?.results && (
          <PaginationList
            currentPage={currentPage}
            maxPage={data.info.pages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      {data?.info && data?.results ? (
        <CharactersList data={data?.results} isPending={isPending} />
      ) : (
        <ResultsNotFound />
      )}
    </>
  );
};

export default CharactersPage;
