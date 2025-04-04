import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import CharactersList from './CharactersList';
import PaginationList from './components/PaginationList';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import Spinner from './components/ui/spinner';
import { getAllCharacters } from './get-all-characters';
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
  const dispatch = useDispatch();

  const timeout = 500;

  const debouncedNameValue = useDebounce(searchName, timeout);
  const debouncedSpeciesValue = useDebounce(searchSpecies, timeout);
  const debouncedTypeValue = useDebounce(searchType, timeout);

  const filters: FilterParams = {
    name: debouncedNameValue,
    gender: searchGender,
    species: debouncedSpeciesValue,
    status: searchStatus,
    type: debouncedTypeValue,
  };

  dispatch(addFilters(filters));

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

  const pageCount = data?.info ? data.info.count : 0;

  const { page, setNextPage, setPreviousPage } = usePagination(
    currentPage,
    pageCount
  );

  const filtersBadge = useAppSelector(filtersList);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="text-slate-700 grid gap-4 w-full justify-center p-4">
      <div className="grid gap-4 md:border md:rounded-lg md:p-4 md:shadow-lg">
        <div className="border rounded-lg p-2 bg-[#01b6a5] text-white text-md md:text-2xl md:border-none md:p-0 md:bg-transparent md:text-slate-800">
          Character's list from Rick and Morty
        </div>
        <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4 justify-center">
          <div className="flex gap-2 items-center">
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
          <div className="flex gap-2 items-center">
            <Label htmlFor="status" className="hidden md:block">
              Status:
            </Label>
            <SelectField
              placeholder="Select by status"
              data={statusOptions}
              onChange={setSearchStatus}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="gender" className="hidden md:block">
              Gender:
            </Label>
            <SelectField
              placeholder="Select by gender"
              data={genderOptions}
              onChange={setSearchGender}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="species" className="hidden md:block">
              Species:
            </Label>
            <SearchField
              placeholder="Search by species"
              value={searchSpecies}
              onChange={(e) => setSearchSpecies(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
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
        <div className="flex items-center justify-center h-4 gap-2">
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
        <div className="h-[calc(100vh-theme('spacing.64'))] w-full grid justify-center items-center border rounded-2xl shadow-2xl">
          <div className="grid gap-4">
            <p className="lg:text-3xl text-slate-700">Oops</p>
            <p className="lg:text-xl text-slate-500">No data found.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4">
            <CharactersList data={data.results} />
          </div>
          <div className="flex gap-1 md:gap-4 justify-center">
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
