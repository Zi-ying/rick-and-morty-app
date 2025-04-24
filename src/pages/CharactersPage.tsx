import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import CharactersList from '@/features/charactersList/charactersList';
import { getAllCharacters } from '@/features/charactersList/get-all-characters';
import { getMultipleCharacters } from '@/features/charactersList/get-multiple-characters';
import Navigation from '@/features/navigation';
import FilterBadges from '@/features/searchFields/filterBadges';
import { characterTypeOptions, genderOptions, speciesOptions, statusOptions } from '@/features/searchFields/options';
import SearchField from '@/features/searchFields/SearchField';
import SelectField from '@/features/searchFields/SelectField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import { cn } from '@/lib/utils';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppSelector } from '@/store/redux-hooks';
import { CharacterFilterParams, Filters } from '@/types/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const CharactersPage = () => {
  const filters: Filters = useAppSelector(allFilters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>(filters.characterName);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
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

  const keys = Object.keys(localStorage).join()

  const { data: favdata } = useQuery({
    queryKey: ["multipleCharactersData", keys],
    queryFn: async () => getMultipleCharacters(keys),
    placeholderData: keepPreviousData,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="min-h-screen">
      <Navigation>
        <div className="grid gap-2 px-2">
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
              "grid grid-cols-1 gap-2 sm:grid-cols-4",
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
              value={filters.characterType}
              data={characterTypeOptions}
              onChange={(e) => {
                dispatch(addFilter({ key: "characterType", value: e }));
                setCurrentPage(1);
              }}
              classnames="w-full"
            />
          </div>
        </div>
      </Navigation>
      <div className="bg-red-800 text-white">
        {favdata?.map((i) => {
          return <div key={i.id}>{i.name}</div>;
        })}
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
