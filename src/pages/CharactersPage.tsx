import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import CharactersListDisplay from '@/features/charactersList/charactersDisplayList';
import { getAllCharacters } from '@/features/charactersList/get-all-characters';
import { usePagination } from '@/features/charactersList/use-pagination';
import Navigation from '@/features/navigation';
import FilterBadges from '@/features/searchFields/filterBadges';
import { genderOptions, speciesOptions, statusOptions, typeOptions } from '@/features/searchFields/options';
import SearchField from '@/features/searchFields/SearchField';
import SelectField from '@/features/searchFields/SelectField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import { addFilters, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppSelector } from '@/store/redux-hooks';
import { Character, FilterParams, PaginationParams } from '@/types/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { cn } from '../lib/utils';

const CharactersPage = () => {
  const filters: FilterParams = useAppSelector(allFilters);
  const [name, setName] = useState<string>(filters.name);
  const [gender, setGender] = useState<string>(filters.gender);
  const [species, setSpecies] = useState<string>(filters.species);
  const [status, setStatus] = useState<string>(filters.status);
  const [type, setType] = useState<string>(filters.type);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();

  const timeout = 500;

  const debouncedNameValue = useDebounce(name, timeout);

  useEffect(() => {
    dispatch(
      addFilters({
        name: debouncedNameValue,
        gender: gender,
        species: species,
        status: status,
        type: type,
      })
    );
    setCurrentPage(1);
  }, [dispatch, debouncedNameValue, gender, species, status, type]);

  const onResetClick = () => {
    setName("");
    setGender("");
    setSpecies("");
    setStatus("");
    setType("");
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

  const maxPage = data?.info?.pages ?? 0;

  const { page, setFirstPage, setLastPage, setNextPage, setPreviousPage } =
    usePagination(currentPage, maxPage, setCurrentPage);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  if (error) return "An error has occurred: " + error.message;

  const onExpansionClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClear = (filter: keyof FilterParams) => {
    dispatch(removeOneFilter(filter));
    switch (filter) {
      case "name": {
        setName("");
        break;
      }
      case "gender": {
        setGender("");
        break;
      }
      case "status": {
        setStatus("");
        break;
      }
      case "species": {
        setSpecies("");
        break;
      }
      case "type": {
        setType("");
        break;
      }
    }
  };

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
            }}
          />
          <FilterBadges
            filters={filters}
            onClearOne={handleClear}
            onClearAll={onResetClick}
            className="flex gap-2 justify-center"
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
              value={status}
              data={statusOptions}
              onChange={setStatus}
              classnames="w-full"
            />
            <SelectField
              placeholder="Gender"
              value={gender}
              data={genderOptions}
              onChange={setGender}
              classnames="w-full"
            />
            <SelectField
              placeholder="Species"
              value={species}
              data={speciesOptions}
              onChange={setSpecies}
              classnames="w-full"
            />
            <SelectField
              placeholder="Sub-species"
              value={type}
              data={typeOptions}
              onChange={setType}
              classnames="w-full"
            />
          </div>
        </div>
      </Navigation>
      <CharactersListDisplay
        data={data}
        isPending={isPending}
        error={error}
        currentPage={currentPage}
        onFirstPage={setFirstPage}
        onLastPage={setLastPage}
        onPreviousPage={setPreviousPage}
        onNextPage={setNextPage}
        maxPage={maxPage}
      />
    </div>
  );
};

export default CharactersPage;
