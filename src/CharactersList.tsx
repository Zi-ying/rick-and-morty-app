import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { getAllCharacters } from './get-all-characters';
import { genderOptions, statusOptions } from './options';
import { Character, FilterParams, PaginationParams } from './types';
import { useDebounce } from './use-debounce';
import { usePagination } from './use-pagination';

const CharactersList = () => {
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

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Input
        type="text"
        placeholder="Search by character name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="justify-self-center w-3xs"
      />
      <Select onValueChange={setSearchGender}>
        <SelectTrigger className="w-3xs justify-self-center">
          <SelectValue placeholder="Gender"  />
        </SelectTrigger>
        <SelectContent>
        {genderOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="Search by species"
        value={searchSpecies}
        onChange={(e) => setSearchSpecies(e.target.value)}
        className="justify-self-center w-3xs"
      />
      <Select onValueChange={setSearchStatus}>
        <SelectTrigger className="w-3xs justify-self-center">
          <SelectValue placeholder="Status"  />
        </SelectTrigger>
        <SelectContent>
        {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="Search by type"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="justify-self-center w-3xs"
      />
      <Button onClick={onResetClick} className="justify-self-center">
        X Clear all filters
      </Button>
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
      <div className="flex gap-1 md:gap-4 justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={setPreviousPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={setNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default CharactersList;
