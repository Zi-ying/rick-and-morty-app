import { useEffect, useState } from 'react';

import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { SearchInput } from '../inputs';
import Navigation from '../navigation/navigation';
import CharactersFilterBar from './charactersFilterBar';
import CharactersListItems from './charactersListItems';
import { getAllCharacters } from './get-all-characters';

import type { CharacterFilters } from './types';

const CharactersList = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(allFilters).character;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>(filters.name);
  const timeout = 500;
  const debouncedNameValue = useDebounce(name, timeout);

  useEffect(() => {
    dispatch(addFilter({category: 'character', key: "name", value: debouncedNameValue }));
  }, [debouncedNameValue, dispatch]);

  const setSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    setCurrentPage(1);
  };

  const setFilters = (key: keyof CharacterFilters, value: string) => {
    dispatch(addFilter({ category: 'character', key, value }));
    setCurrentPage(1);
  };

  const handleClear = (filter: keyof CharacterFilters) => {
    dispatch(removeOneFilter({ category: 'character', key: filter }));
    setCurrentPage(1);
  };

  const onResetClick = () => {
    dispatch(resetFilters());
    setCurrentPage(1);
  };

  const filtersArgs: CharacterFilters = {
    name: filters.name,
    gender: filters.gender,
    status: filters.status,
    species: filters.species,
    type: filters.type,
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["charactersData", filtersArgs, currentPage],
    queryFn: async () => getAllCharacters(filtersArgs, currentPage.toString()),
    placeholderData: keepPreviousData,
  });

  if (error) {
    return (
      <div role="alert" className="p-4 text-red-500">
        An error has occurred: {error.message}
      </div>
    );
  }

  return (
    <>
      <Navigation>
        <SearchInput
          placeholder="Search by character name"
          value={name}
          onChange={setSearchFilter}
          className="p-4 text-white col-start-2 col-end-4"
          aria-label="Search characters"
        />
      </Navigation>
      <CharactersFilterBar
        filters={filters}
        setFilters={setFilters}
        onClear={handleClear}
        onReset={onResetClick}
      />
      <CharactersListItems
        data={data}
        isPending={isPending}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CharactersList;
