import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import CharactersListDisplay from '../features/charactersList/charactersDisplayList';
import { getAllCharacters } from '../features/charactersList/get-all-characters';
import { usePagination } from '../features/charactersList/use-pagination';
import Navigation from '../features/navigation';
import FilterBadges from '../features/searchFields/filterBadges';
import { genderOptions, speciesOptions, statusOptions, typeOptions } from '../features/searchFields/options';
import SearchField from '../features/searchFields/SearchField';
import SelectField from '../features/searchFields/SelectField';
import { useDebounce } from '../features/searchFields/use-debounce';
import { cn } from '../lib/utils';
import { addFilters, resetFilters } from '../store/filters-slice';
import { Character, FilterParams, PaginationParams } from '../types/types';

const CharactersPage = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [searchGender, setSearchGender] = useState<string>("");
  const [searchSpecies, setSearchSpecies] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();

  const timeout = 500;

  const debouncedNameValue = useDebounce(searchName, timeout);
  const debouncedTypeValue = useDebounce(searchType, timeout);

  const filters: FilterParams = useMemo(
    () => ({
      name: debouncedNameValue,
      gender: searchGender,
      species: searchSpecies,
      status: searchStatus,
      type: debouncedTypeValue,
    }),
    [
      debouncedNameValue,
      searchGender,
      searchSpecies,
      searchStatus,
      debouncedTypeValue,
    ]
  );

  useEffect(() => {
    dispatch(addFilters(filters));
  }, [dispatch, filters]);

  const onResetClick = () => {
    setSearchName("");
    setSearchGender("");
    setSearchSpecies("");
    setSearchStatus("");
    setSearchType("");
    dispatch(resetFilters());
  };

  const { data, isPending, error } = useQuery<{
    results: Character[];
    info: PaginationParams;
  }>({
    queryKey: ["charactersData", filters, currentPage],
    queryFn: async () => getAllCharacters(filters, currentPage.toString()),
    placeholderData: keepPreviousData,
  });

  const pageCount = data?.info?.count ?? 0;

  const { page, setNextPage, setPreviousPage } = usePagination(
    currentPage,
    pageCount
  );

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  if (error) return "An error has occurred: " + error.message;

  const onExpansionClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full min-h-screen bg-black md:relative">
      <Navigation>
        <div className="bg-red-500 min-w-80 justify-self-center">
          <SearchField
            placeholder="Search by character name"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
        </div>
        <Button
          onClick={onExpansionClick}
          className="md:hidden justify-self-center"
        >
          {isExpanded ? "Less" : "More..."}
        </Button>
        <div
          className={cn(
            "flex gap-2 items-center w-full",
            !isExpanded && "hidden md:flex"
          )}
        >
          <Label htmlFor="status" className="hidden md:block">
            Status:
          </Label>
          <SelectField
            placeholder="Select by status"
            value={searchStatus}
            data={statusOptions}
            onChange={setSearchStatus}
            classnames="w-full"
          />
        </div>
        <div
          className={cn(
            "flex gap-2 items-center w-full",
            !isExpanded && "hidden md:flex"
          )}
        >
          <Label htmlFor="gender" className="hidden md:block">
            Gender:
          </Label>
          <SelectField
            placeholder="Select by gender"
            value={searchGender}
            data={genderOptions}
            onChange={setSearchGender}
            classnames="w-full"
          />
        </div>
        <div
          className={cn(
            "flex gap-2 items-center w-full",
            !isExpanded && "hidden md:flex"
          )}
        >
          <Label htmlFor="species" className="hidden md:block">
            Species:
          </Label>
          <SelectField
            placeholder="Select by species"
            value={searchSpecies}
            data={speciesOptions}
            onChange={setSearchSpecies}
            classnames="w-full"
          />
        </div>
        <div
          className={cn(
            "flex gap-2 items-center w-full",
            !isExpanded && "hidden md:flex"
          )}
        >
          <Label htmlFor="type" className="hidden md:block">
            Type:
          </Label>
          <SelectField
            placeholder="Select by type"
            value={searchType}
            data={typeOptions}
            onChange={setSearchType}
            classnames="w-full"
          />
        </div>
        <div className="hidden md:inline-flex items-center justify-center h-4 gap-2">
          <FilterBadges />
        </div>
        <Button onClick={onResetClick} className="justify-self-center">
          X Clear all filters
        </Button>
      </Navigation>
      <CharactersListDisplay
        data={data}
        isPending={isPending}
        error={error}
        currentPage={currentPage}
        onPreviousPage={setPreviousPage}
        onNextPage={setNextPage}
      />
    </div>
  );
};

export default CharactersPage;
