import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import SmallCharacterCard from '@/features/character/smallCharacterCard';
import { addFavorite, allFavorites, removeFavorite } from '@/store/favorites-slice';
import { allFilters } from '@/store/filters-slice';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { Filters } from '@/types/filters';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import PaginationList from '../pagination/paginationList';
import ResultNotFound from '../resultNotFound';
import CharacterCard from './characterCard';
import CharactersFavorites from './charactersFavorites';
import CharactersInputs from './charactersInputs';
import { getAllCharacters } from './get-all-characters';

import type { Character, CharacterFilters } from "./types";
const CharactersList = () => {
  const keys = useAppSelector(allFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filters: Filters = useAppSelector(allFilters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFavoritePage, setIsFavoritePage] = useState<boolean>(false);

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
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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

  if (isFavoritePage) {
    return (
      <div className="grid gap-2 p-2 sticky top-14 z-10 bg-home bg-fixed">
        <CharactersFavorites
          isFavoritePage={isFavoritePage}
          setIsFavoritePage={() => setIsFavoritePage(!isFavoritePage)}
          onToggle={onToggle}
        />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="h-[calc(100vh-56px)] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-2 p-2 sticky top-14 z-10 bg-home bg-fixed">
        <CharactersInputs
          filters={filters}
          isFavoritePage={isFavoritePage}
          setIsFavoritePage={() => setIsFavoritePage(!isFavoritePage)}
          setCurrentPage={setCurrentPage}
        />
        {data?.info && data?.results && (
          <PaginationList
            currentPage={currentPage}
            maxPage={data.info.pages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      {data?.info && data?.results ? (
        <>
          <div className="w-full hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 p-6">
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
          <div className="w-full grid sm:grid-cols-2 gap-2 md:hidden p-4">
            {data.results.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={item.id.toString()}
                  className="grid justify-center cursor-pointer"
                >
                  <SmallCharacterCard data={item} isPending={isPending} />
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <ResultNotFound />
      )}
    </>
  );
};

export default CharactersList;
