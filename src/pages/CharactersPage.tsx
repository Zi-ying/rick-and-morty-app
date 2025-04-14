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
import { addFilters, allFilters, resetFilters } from '@/store/filters-slice';
import { useAppSelector } from '@/store/redux-hooks';
import { Character, FilterParams, PaginationParams } from '@/types/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const CharactersPage = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");
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
  }, [dispatch, debouncedNameValue, gender, species, status, type]);

  const filters: FilterParams = useAppSelector(allFilters);

  const onResetClick = () => {
    setName("");
    setGender("");
    setSpecies("");
    setStatus("");
    setType("");
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <Button
          onClick={onExpansionClick}
          className="md:hidden justify-self-center"
        >
          {isExpanded ? "Less" : "More..."}
        </Button>
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
