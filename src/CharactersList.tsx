import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getAllCharacters } from './get-all-characters';
import { genderOptions, statusOptions } from './options';
import { Character, FilterParams, Pagination } from './types';
import { useDebounce } from './use-debounce';
import { usePagination } from './use-pagination';

const CharactersList = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [searchGender, setSearchGender] = useState<string>("");
  const [searchSpecies, setSearchSpecies] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1)

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
    info: Pagination;
  }>({
    queryKey: ["charactersData", filters, currentPage],
    queryFn: async () => getAllCharacters(filters, currentPage.toString()),
    placeholderData: keepPreviousData,
  });

  const pageCount = data?.info ? data.info.count : 0

  const { page, setNextPage, setPreviousPage } = usePagination(currentPage, pageCount);

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <input
        type="text"
        placeholder="Search by character name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="py-2 px-3 w-3xs border border-gray-400 rounded-md text-sm justify-self-center"
      />
      <select
        onChange={(e) => setSearchGender(e.currentTarget.value)}
        className="py-2 px-3 w-3xs border border-gray-400 rounded-md text-sm justify-self-center"
      >
        {genderOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search by species"
        value={searchSpecies}
        onChange={(e) => setSearchSpecies(e.target.value)}
        className="py-2 px-3 w-3xs border border-gray-400 rounded-md text-sm justify-self-center"
      />
      <select
        onChange={(e) => setSearchStatus(e.currentTarget.value)}
        className="py-2 px-3 w-3xs border border-gray-400 rounded-md text-sm justify-self-center"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search by type"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="py-2 px-3 w-3xs border border-gray-400 rounded-md text-sm justify-self-center"
      />
      <button onClick={onResetClick} className="justify-self-center">
        X Clear all filters
      </button>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
        {!data.results ? (
          <div>There is no Data</div>
        ) : (
          data.results.map((item) => {
            return (
              <Link
                key={item.id}
                to={`${item.id}`}
                className="bg-white border border-gray-100 rounded-lg shadow-lg grid justify-center p-2 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={`image of ${item.name} from Rick and Morty`}
                  className="rounded-lg"
                />
                <h5 className="text-gray-700">{item.name}</h5>
                <h5 className="text-gray-500">{item.status}</h5>
                <h5 className="text-gray-500">{item.species}</h5>
                <h5 className="text-gray-500">{item.gender}</h5>
                <h5 className="text-gray-500">{item.type}</h5>
              </Link>
            );
          })
        )}
      </div>
      <div className='flex gap-1 md:gap-4 justify-center'>
        <button onClick={setPreviousPage}>
          Previous
        </button>
        <button>{currentPage}</button>
        <button onClick={setNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default CharactersList;
