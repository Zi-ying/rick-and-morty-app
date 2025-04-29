import { Link } from 'react-router-dom';

import SmallCharacterCard from '@/features/character/smallCharacterCard';
import { addFavorite, allFavorites, removeFavorite } from '@/store/favorites-slice';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';

import DataNotFound from '../dataNotFound';
import CharacterCard from './characterCard';

import type { Character } from "@/types/types";
interface CharactersListProps {
  data: Character[] | undefined;
  isPending: boolean;
  error: Error | null;
}

const CharactersList = ({ data, isPending, error }: CharactersListProps) => {
  const keys = useAppSelector(allFavorites);
  const dispatch = useAppDispatch();

  const getFavorite = (item: Character) => {
    return keys.includes(item.id.toString());
  };

  const onClick = (item: Character) => {
    const isFavorite = getFavorite(item);

    if (!isFavorite) {
      dispatch(addFavorite({ key: item.id.toString(), value: item.name }));
    } else {
      dispatch(removeFavorite(item.id.toString()));
    }
  };

  if (error) return <div>An error has occurred: {error.message}</div>;

  if (!data) {
    return <DataNotFound />;
  }

  return (
    <>
      <div className="hidden sm:inline-grid sm:text-2xl sm:text-pickle-500">
        Character's list from Rick and Morty
      </div>
      <div className="w-full hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 p-6">
        {data.map((item) => {
          const isFavorite = getFavorite(item);

          return (
            <Link
              key={item.id}
              to={item.id.toString()}
              className="grid justify-center cursor-pointer"
            >
              <CharacterCard
                data={item}
                isPending={isPending}
                isFavorite={isFavorite}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {onClick(item);  e.preventDefault()}}
              />
            </Link>
          );
        })}
      </div>
      <div className="w-full grid sm:grid-cols-2 gap-2 md:hidden p-4">
        {data.map((item) => {
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
  );
};

export default CharactersList;
