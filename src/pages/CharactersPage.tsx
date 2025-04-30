import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import CharactersList from '@/features/charactersList/charactersList';
import { getAllCharacters } from '@/features/charactersList/get-all-characters';
import { getMultipleCharacters } from '@/features/charactersList/get-multiple-characters';
import { getPagination } from '@/features/pagination/get-pagination';
import PaginationList from '@/features/pagination/paginationList';
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

const CharactersPage = () => {
  const filters: Filters = useAppSelector(allFilters);
  const keys = useAppSelector(allFavorites);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>(filters.characterName);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isFavoritePage, setIsFavoritePage] = useState<boolean>(false);
  const dispatch = useDispatch();

  const timeout = 500;

  const debouncedNameValue = useDebounce(name, timeout);

  useEffect(() => {
    dispatch(addFilter({ key: "characterName", value: debouncedNameValue }));
  }, [dispatch, name, debouncedNameValue]);

  const onResetClick = () => {
    dispatch(resetFilters());
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

  const onExpansionClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClear = (filter: keyof Filters) => {
    dispatch(removeOneFilter(filter));
    setCurrentPage(1);
  };

  const { data: favdata } = useQuery({
    queryKey: ["multipleCharactersData", keys],
    queryFn: async () => getMultipleCharacters(keys.join()),
    placeholderData: keepPreviousData,
  });

  const onClick = () => {
    setIsFavoritePage(!isFavoritePage);
  };

  const maxPage = data?.info.pages ?? 0;

  const {
    page,
    isFirstPage,
    isLastPage,
    setFirstPage,
    setLastPage,
    setNextPage,
    setPreviousPage,
  } = getPagination(currentPage, maxPage, setCurrentPage);

  if (error) return "An error has occurred: " + error.message;

  const setFilters = (key: keyof Filters, value: string) => {
    dispatch(addFilter({ key, value }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <div className="grid gap-2 px-2 bg-red-600">
        <SearchField
          placeholder="Search by character name"
          value={name}
          className="max-w-96 justify-self-center p-4"
          onChange={(e) => {
            setName(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Toggle aria-label="Toggle heart" onClick={onClick}>
          <Heart className={cn("", isFavoritePage && "fill-pink-600")} />
        </Toggle>
        {/* Filter Bar */}
        <div>
          <div
            className={cn(
              "grid grid-cols-1 gap-2 sm:grid-cols-4",
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
          <Button onClick={onExpansionClick} className="ml-2">
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
      <div className="sticky top-52">
        <PaginationList
          page={page}
          maxPage={maxPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          setPage={setCurrentPage}
          onFirstPage={setFirstPage}
          onLastPage={setLastPage}
          onPreviousPage={setPreviousPage}
          onNextPage={setNextPage}
        />
      </div>
      <CharactersList
        data={isFavoritePage ? favdata : data?.results}
        isPending={isPending}
        error={error}
      />
    </div>
  );
};

export default CharactersPage;
