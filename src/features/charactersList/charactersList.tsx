import { Link, useNavigate } from 'react-router-dom';

import SmallCharacterCard from '@/features/character/smallCharacterCard';
import { addFavorite, allFavorites, removeFavorite } from '@/store/favorites-slice';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';

import ResultsNotFound from '../resultsNotFound';
import CharacterCard from './characterCard';

import type { Character } from "@/types/types";
interface CharactersListProps {
  data: Character[] | undefined;
  isPending: boolean;
}

const CharactersList = ({ data, isPending }: CharactersListProps) => {
  const keys = useAppSelector(allFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  if (!data || data.length === 0) {
    return <ResultsNotFound className="h-[calc(100vh-200px)]" />;
  }

  return (
    <>
      <div className="w-full hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 p-6">
        {data.map((item) => {
          const isFavorite = getFavorite(item);

          return (
            <CharacterCard
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
