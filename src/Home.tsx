import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import CharactersList from './CharactersList';
import PaginationList from './components/PaginationList';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import Spinner from './components/ui/spinner';
import { getAllCharacters } from './get-all-characters';
import { cn } from './lib/utils';
import { genderOptions, statusOptions } from './options';
import SearchField from './SearchField';
import SelectField from './SelectField';
import { addFilters, filtersList } from './store/filters-slice';
import { useAppSelector } from './store/redux-hooks';
import { Character, FilterParams, PaginationParams } from './types';
import { useDebounce } from './use-debounce';
import { usePagination } from './use-pagination';

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

  const filters: FilterParams = useMemo(
    () => ({
      name: debouncedNameValue,
      gender: searchGender,
      species: debouncedSpeciesValue,
      status: searchStatus,
      type: debouncedTypeValue,
    }),
    [
      debouncedNameValue,
      searchGender,
      debouncedSpeciesValue,
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

  const filtersBadge = useAppSelector(filtersList);

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
        <div className="border rounded-lg p-2 bg-[#01b6a5] text-white text-md md:text-2xl md:border-none md:p-0 md:bg-transparent md:text-[#01b6a5]">
          Character's list from Rick and Morty
        </div>
        <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-2 justify-center w-full">
          <div className="flex gap-2 items-center w-3xs md:w-full">
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
           {isExpanded ? "Less":  "More..."}
          </Button>
          <div
            className={cn(
              "flex gap-2 items-center",
              isExpanded ? "inline-block" : "hidden md:inline-flex"
            )}
          >
            <Label htmlFor="status" className="hidden md:block">
              Status:
            </Label>
            <SelectField
              placeholder="Select by status"
              classnames='w-3xs md:w-full'
              data={statusOptions}
              onChange={setSearchStatus}
            />
          </div>
          <div
            className={cn(
              "flex gap-2 items-center",
              isExpanded ? "inline-block" : "hidden  md:inline-flex"
            )}
          >
            <Label htmlFor="gender" className="hidden md:block">
              Gender:
            </Label>
            <SelectField
              placeholder="Select by gender"
              classnames='w-3xs md:w-full'
              data={genderOptions}
              onChange={setSearchGender}
            />
          </div>
          <div
            className={cn(
              "flex gap-2 items-center",
              isExpanded ? "inline-block" : "hidden md:inline-flex"
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
              "flex gap-2 items-center",
              isExpanded ? "inline-block" : "hidden  md:inline-flex"
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
        <div className="hidden md:inline-block items-center justify-center h-4 gap-2">
          {filtersBadge.filters.name && (
            <Badge>{filtersBadge.filters.name}</Badge>
          )}
          {filtersBadge.filters.gender && (
            <Badge>{filtersBadge.filters.gender}</Badge>
          )}
          {filtersBadge.filters.status && (
            <Badge>{filtersBadge.filters.status}</Badge>
          )}
          {filtersBadge.filters.species && (
            <Badge>{filtersBadge.filters.species}</Badge>
          )}
          {filtersBadge.filters.type && (
            <Badge>{filtersBadge.filters.type}</Badge>
          )}
        </div>
        <Button onClick={onResetClick} className="justify-self-center">
          X Clear all filters
        </Button>
      </div>

      {isPending && (
        <div className="min-h-96 w-full grid justify-center items-center border rounded-2xl shadow-2xl">
          <Spinner />
        </div>
      )}
      {!data?.results ? (
        <div className="min-h-96 flex flex-col items-center justify-center gap-4">
          <p className="lg:text-3xl text-slate-700">Oops</p>
          <h1 className="lg:text-xl text-slate-500">No data found.</h1>
        </div>
      ) : (
        <>
          <div className="w-full hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-4 p-4">
            <CharactersList data={data.results} />
          </div>
          <div className="w-full grid gap-2 md:hidden">
            <CharactersList data={data.results} isSmallScreen />
          </div>
          <div className="flex gap-1 md:gap-4 justify-center p-4">
            <PaginationList
              page={currentPage}
              onPreviousPage={setPreviousPage}
              onNextPage={setNextPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
