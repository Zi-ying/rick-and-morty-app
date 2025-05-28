import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import SmallCharacterCard from '@/features/character/smallCharacterCard';
import { addFavorite, allFavorites, removeFavorite } from '@/store/favorites-slice';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { Filters } from '@/types/filters';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { SearchInput } from '../inputs';
import Navigation from '../navigation';
import PaginationList from '../pagination/paginationList';
import ResultNotFound from '../resultNotFound';
import CharacterCard from './characterCard';
import CharactersFilterBar from './charactersFilterBar';
import { getAllCharacters } from './get-all-characters';

import type { Character, CharacterFilters } from "./types";
const CharactersList = () => {
  const keys = useAppSelector(allFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filters: Filters = useAppSelector(allFilters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>(filters.characterName);

  const timeout = 500;

  const debouncedNameValue = useDebounce(name, timeout);

  useEffect(() => {
    dispatch(addFilter({ key: "characterName", value: debouncedNameValue }));
  }, [debouncedNameValue, dispatch]);

  const setSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    setCurrentPage(1);
  };
  const setFilters = (key: keyof Filters, value: string) => {
    dispatch(addFilter({ key, value }));
    setCurrentPage(1);
  };

  const handleClear = (filter: keyof Filters) => {
    dispatch(removeOneFilter(filter));
    setCurrentPage(1);
  };

  const onResetClick = () => {
    dispatch(resetFilters());
    setCurrentPage(1);
  };

  const filtersArgs: CharacterFilters = {
    name: filters.characterName,
    gender: filters.gender,
    status: filters.status,
    species: filters.species,
    type: filters.characterType,
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["charactersData", filtersArgs, currentPage],
    queryFn: async () => getAllCharacters(filtersArgs, currentPage.toString()),
    placeholderData: keepPreviousData,
  });

  const getFavorite = (item: Character) => {
    return keys.includes(item.id.toString());
  };

  const onToggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: Character
  ) => {
    e.stopPropagation();
    const isFavorite = getFavorite(item);

    if (!isFavorite) {
      dispatch(addFavorite({ key: item.id.toString(), value: item.name }));
    } else {
      dispatch(removeFavorite(item.id.toString()));
    }
  };

  if (error) return "An error has occurred: " + error.message;

  if (isPending) {
    return (
      <div className="h-[calc(100vh-56px)] flex items-center justify-center">
        <Spinner size="lg" />
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
        />
      </Navigation>
      <div className="p-4 overflow-auto">
        <CharactersFilterBar
          filters={filters}
          setFilters={setFilters}
          onClear={handleClear}
          onReset={onResetClick}
        />
        {data?.info && data?.results ? (
          <div className="grow flex flex-col">
            <div className="w-full hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data.results.map((item) => {
                const isFavorite = getFavorite(item);

                return (
                  <CharacterCard
                    key={item.id}
                    data={item}
                    isPending={isPending}
                    isFavorite={isFavorite}
                    onClick={() => {
                      navigate(`/character/${item.id}`);
                    }}
                    onToggle={(e) => onToggle(e, item)}
                  />
                );
              })}
            </div>
            <div className="w-full grid sm:grid-cols-2 p-6 gap-3 md:hidden">
              {data.results.map((item) => {
                const isFavorite = getFavorite(item);

                return (
                  <SmallCharacterCard
                    key={item.id}
                    data={item}
                    isPending={isPending}
                    isFavorite={isFavorite}
                    hasToggle
                    onClick={() => {
                      navigate(`/character/${item.id}`);
                    }}
                    onToggle={(e) => onToggle(e, item)}
                  />
                );
              })}
            </div>
            <PaginationList
              currentPage={currentPage}
              maxPage={data.info.pages}
              setCurrentPage={setCurrentPage}
              className="mt-auto"
            />
          </div>
        ) : (
          <ResultNotFound />
        )}
      </div>
    </>
  );
};

export default CharactersList;
