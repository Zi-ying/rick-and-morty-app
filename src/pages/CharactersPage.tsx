import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import CharactersList from '@/features/charactersList/charactersList';
import { getAllCharacters } from '@/features/charactersList/get-all-characters';
import Navigation from '@/features/navigation';
import FilterBadges from '@/features/searchFields/filterBadges';
import { genderOptions, speciesOptions, statusOptions, typeOptions } from '@/features/searchFields/options';
import SearchField from '@/features/searchFields/SearchField';
import SelectField from '@/features/searchFields/SelectField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import { cn } from '@/lib/utils';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppSelector } from '@/store/redux-hooks';
import { CharacaterFilterParams, Character, PaginationParams } from '@/types/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const CharactersPage = () => {
  const filters: CharacaterFilterParams = useAppSelector(allFilters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>(filters.name);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();

  const timeout = 500;

  const debouncedNameValue = useDebounce(name, timeout);

  useEffect(() => {
    dispatch(addFilter({ key: "name", value: debouncedNameValue }));
  }, [dispatch, name, debouncedNameValue]);

  const onResetClick = () => {
    dispatch(resetFilters());
    setCurrentPage(1);
  };

  const { data, isPending, error } = useQuery<{
    results: Character[];
    info: PaginationParams;
  }>({
    queryKey: ["charactersData", filters, currentPage],
    queryFn: async () => getAllCharacters(filters, currentPage.toString()),
    placeholderData: keepPreviousData,
  });

  const onExpansionClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClear = (filter: keyof CharacaterFilterParams) => {
    dispatch(removeOneFilter(filter));
    setCurrentPage(1);
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full min-h-screen bg-black md:relative">
      <Navigation>
        <div className="grid bg-red-400 gap-2 px-2">
          <SearchField
            placeholder="Search by character name"
            value={name}
            className="max-w-96 justify-self-center p-4"
            onChange={(e) => {
              setName(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FilterBadges
            filters={filters}
            onClearOne={handleClear}
            onClearAll={onResetClick}
            className="flex flex-wrap gap-2 justify-center items-center"
          />
          <Button
            onClick={onExpansionClick}
            className={cn(
              "justify-self-center",
              isExpanded ? "rotate-180" : ""
            )}
          >
            V
          </Button>
          <div
            className={cn(
              "bg-red-300 grid grid-cols-1 gap-2 sm:grid-cols-4",
              isExpanded ? "inline-grid" : "hidden"
            )}
          >
            <SelectField
              placeholder="Status"
              value={filters.status}
              data={statusOptions}
              onChange={(e) => {
                dispatch(addFilter({ key: "status", value: e }));
                setCurrentPage(1);
              }}
              classnames="w-full"
            />
            <SelectField
              placeholder="Gender"
              value={filters.gender}
              data={genderOptions}
              onChange={(e) => {
                dispatch(addFilter({ key: "gender", value: e }));
                setCurrentPage(1);
              }}
              classnames="w-full"
            />
            <SelectField
              placeholder="Species"
              value={filters.species}
              data={speciesOptions}
              onChange={(e) => {
                dispatch(addFilter({ key: "species", value: e }));
                setCurrentPage(1);
              }}
              classnames="w-full"
            />
            <SelectField
              placeholder="Sub-species"
              value={filters.type}
              data={typeOptions}
              onChange={(e) => {
                dispatch(addFilter({ key: "type", value: e }));
                setCurrentPage(1);
              }}
              classnames="w-full"
            />
          </div>
        </div>
      </Navigation>
      <div className="hidden md:inline-grid md:text-2xl md:text-brand-500">
        Character's list from Rick and Morty
      </div>
      <CharactersList
        data={data}
        isPending={isPending}
        error={error}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default CharactersPage;
