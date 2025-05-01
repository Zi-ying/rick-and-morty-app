import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import CharactersList from '@/features/charactersList/charactersList';
import { getAllCharacters } from '@/features/charactersList/get-all-characters';
import { getMultipleCharacters } from '@/features/charactersList/get-multiple-characters';
import FilterBadges from '@/features/searchFields/filterBadges';
import { characterTypeOptions, genderOptions, speciesOptions, statusOptions } from '@/features/searchFields/options';
import SearchField from '@/features/searchFields/SearchField';
import SelectField from '@/features/searchFields/SelectField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import { cn } from '@/lib/utils';
import { allFavorites } from '@/store/favorites-slice';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppSelector } from '@/store/redux-hooks';
import { CharacterFilterParams, Filters } from '@/types/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import HeartToggle from '../components/heart-toggle';
import DataNotFound from '../features/dataNotFound';
import PaginationList from '../features/pagination/paginationList';

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

  const filtersArgs: CharacterFilterParams = {
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

  if (isFavoritePage) {
    const filteredData = favdata?.filter((d) => d.name.includes(value));

    return (
      <div>
        <div className="flex justify-center">
          <SearchField
            placeholder="Search by character name"
            value={name2}
            className="max-w-96 p-4"
            onChange={(e) => setName2(e.target.value)}
          />
          <HeartToggle
            isToggled={isFavoritePage}
            onToggle={() => setIsFavoritePage(!isFavoritePage)}
          />
        </div>
        <CharactersList data={filteredData} isPending={isFavDataPending} />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-2 px-2 sticky top-12 z-10 bg-home bg-fixed">
        <div className="flex justify-center items-center">
          <SearchField
            placeholder="Search by character name"
            value={name}
            className="max-w-96 p-4 text-white"
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <HeartToggle
            isToggled={isFavoritePage}
            onToggle={() => setIsFavoritePage(!isFavoritePage)}
          />
        </div>
        {/* Filter Bar */}
        <div>
          <div
            className={cn(
              "grid grid-cols-1 gap-2 sm:grid-cols-4 text-white",
              isExpanded ? "inline-grid" : "hidden"
            )}
          >
            <SelectField
              placeholder="Status"
              value={filters.status}
              data={statusOptions}
              onChange={(e) => setFilters("status", e)}
              classnames="w-full"
            />
            <SelectField
              placeholder="Gender"
              value={filters.gender}
              data={genderOptions}
              onChange={(e) => setFilters("gender", e)}
              classnames="w-full"
            />
            <SelectField
              placeholder="Species"
              value={filters.species}
              data={speciesOptions}
              onChange={(e) => setFilters("species", e)}
              classnames="w-full"
            />
            <SelectField
              placeholder="Sub-species"
              value={filters.characterType}
              data={characterTypeOptions}
              onChange={(e) => setFilters("characterType", e)}
              classnames="w-full"
            />
          </div>
          <Button onClick={() => setIsExpanded(!isExpanded)} className="ml-2">
            + Add Filter
          </Button>
        </div>
        <FilterBadges
          filters={filters}
          onClearOne={handleClear}
          onClearAll={onResetClick}
          className="flex flex-wrap gap-2 justify-center items-center"
        />
      </div>
      {!data?.info && !data?.results ? (
        <DataNotFound />
      ) : (
        <>
          <div className="sticky top-34 z-10 bg-home bg-fixed">
            <div className="hidden sm:inline-grid sm:text-2xl sm:text-pickle-500">
              Character's list from Rick and Morty
            </div>
            <PaginationList
              currentPage={currentPage}
              maxPage={data.info.pages}
              setPage={setCurrentPage}
            />
          </div>
          <CharactersList data={data?.results} isPending={isPending} />
        </>
      )}
    </>
  );
};

export default CharactersPage;
