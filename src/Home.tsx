import { useEffect, useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import CharactersList from './CharactersList';
import PaginationList from './components/PaginationList';
import { Button } from './components/ui/button';
import Spinner from './components/ui/spinner';
import { getAllCharacters } from './get-all-characters';
import { genderOptions, statusOptions } from './options';
import SearchField from './SearchField';
import SelectField from './SelectField';
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

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="text-slate-700 grid gap-4 w-full justify-center">
      <div className="text-sm md:text-2xl">
        Character's list from Rick and Morty
      </div>
      <div className="grid gap-4 justify-center">
        <SearchField
          placeholder="Search by character name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <SelectField
          placeholder="Select by status"
          data={statusOptions}
          onChange={setSearchStatus}
        />
        <SelectField
          placeholder="Select by gender"
          data={genderOptions}
          onChange={setSearchGender}
        />
        <SearchField
          placeholder="Search by species"
          value={searchSpecies}
          onChange={(e) => setSearchSpecies(e.target.value)}
        />
        <SearchField
          placeholder="Search by type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <Button onClick={onResetClick} className="justify-self-center">
          X Clear all filters
        </Button>
      </div>
      <div>
      { isPending && (
          <div className="min-h-96 w-full grid justify-center items-center border rounded-2xl shadow-2xl">
            <Spinner />
          </div>
        )}
      </div>
      {!data?.results ? (
        <div className="min-h-96 w-full grid justify-center items-center border rounded-2xl shadow-2xl">
          <div className="grid gap-4">
            <p className="lg:text-3xl text-slate-700">Oops</p>
            <p className="lg:text-xl text-slate-500">No data found</p>
            <Button onClick={onResetClick} className="justify-self-center">
              X Clear all filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4">
          <CharactersList data={data.results} />
        </div>
      )}
      <div className="flex gap-1 md:gap-4 justify-center">
        <PaginationList
          page={currentPage}
          onPreviousPage={setPreviousPage}
          onNextPage={setNextPage}
        />
      </div>
    </div>
  );
};

export default Home;
