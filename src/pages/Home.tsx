import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import CharactersListDisplay from '../features/charactersList/characterListDisplay';
import { getAllCharacters } from '../features/charactersList/get-all-characters';
import { usePagination } from '../features/charactersList/use-pagination';
import FilterBadges from '../features/searchFields/filterBadges';
import { genderOptions, statusOptions } from '../features/searchFields/options';
import SearchField from '../features/searchFields/SearchField';
import SelectField from '../features/searchFields/SelectField';
import { useDebounce } from '../features/searchFields/use-debounce';
import { cn } from '../lib/utils';
import { addFilters, resetFilters } from '../store/filters-slice';
import { Character, FilterParams, PaginationParams } from '../types/types';

const Home = () => {
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
  const debouncedSpeciesValue = useDebounce(searchSpecies, timeout);
  const debouncedTypeValue = useDebounce(searchType, timeout);

  const filters: FilterParams = useMemo(() => ({
    name: debouncedNameValue,
    gender: searchGender,
    species: debouncedSpeciesValue,
    status: searchStatus,
    type: debouncedTypeValue,
  }), [debouncedNameValue, searchGender, debouncedSpeciesValue, searchStatus, debouncedTypeValue]);

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
    <div className="w-full md:relative">
      <div className="grid gap-4 md:border-b md:rounded-b-lg md:p-4 md:shadow-lg md:sticky top-0 left-0 right-0 bg-white p-2">
        <div className="border rounded-lg p-2 bg-brand-500 text-white text-md md:text-2xl md:border-none md:p-0 md:bg-transparent md:text-brand-500">
          Character's list from Rick and Morty
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-2 justify-center w-full">
          <div className="flex gap-2 items-center w-full">
            <Label htmlFor="name" className="hidden md:block">
              Name:
            </Label>
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
              classnames="w-full"
              data={statusOptions}
              onChange={setSearchStatus}
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
              classnames="w-full"
              data={genderOptions}
              onChange={setSearchGender}
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
            <SearchField
              placeholder="Search by species"
              value={searchSpecies}
              onChange={(e) => setSearchSpecies(e.target.value)}
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
            <SearchField
              placeholder="Search by type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            />
          </div>
        </div>
        <div className="hidden md:inline-flex items-center justify-center h-4 gap-2">
          <FilterBadges />
        </div>
        <Button onClick={onResetClick} className="justify-self-center">
          X Clear all filters
        </Button>
      </div>
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

export default Home;
