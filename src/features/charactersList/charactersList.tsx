import { Link } from 'react-router-dom';

import SmallCharacterCard from '@/features/character/smallCharacterCard';

import DataNotFound from '../dataNotFound';
import CharacterCard from './characterCard';

import type { Character } from "@/types/types";
interface CharactersListProps {
  data: Character[] | undefined;
  isPending: boolean;
  error: Error | null;
}

const CharactersList = ({ data, isPending, error }: CharactersListProps) => {

  const keys = Object.keys(localStorage);

  const isFav = (value: string) => keys.includes(value);

  const favArray: Character[] = [];

  const getFav = (value: Character, isFav: boolean) => {
    return isFav ? favArray.push(value) : undefined;
  };

  const onClick = (value: Character) => {
    const isFavo = favArray.find(i => i.id === value.id)
    if (isFavo) {
      localStorage.removeItem(value.id.toString());
    }
    if (!isFavo) {

      localStorage.setItem(value.id.toString(), value.name)
    }
  }


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
          const fav = isFav(item.id.toString());
          getFav(item, fav);
          return (
            // <Link
            //   key={item.id}
            //   to={item.id.toString()}
            //   className="grid justify-center cursor-pointer"
            // >
            <CharacterCard data={item} isPending={isPending} isFav={fav} onClick={() => onClick(item)}/>
            // </Link>
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
