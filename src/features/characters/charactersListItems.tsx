import type { Pagination } from "@/types/pagination";
import type { Character } from "./types";
import { useNavigate } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import { addFavorite, allFavorites, removeFavorite } from '@/store/favorites-slice';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';

import SmallCharacterCard from '../character/smallCharacterCard';
import { getFavorite } from '../get-favorite';
import PaginationList from '../pagination/paginationList';
import ResultNotFound from '../resultNotFound';
import CharacterCard from './characterCard';

interface CharacterListItemsProps {
  data?: { info: Pagination; results: Character[] };
  isPending: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CharactersListItems = ({
  data,
  isPending,
  currentPage,
  setCurrentPage,
}: CharacterListItemsProps) => {
  const keys = useAppSelector(allFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onToggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: Character
  ) => {
    e.stopPropagation();
    const isFavorite = getFavorite(keys, item);

    if (!isFavorite) {
      dispatch(addFavorite({ key: item.id.toString(), value: item.name }));
    } else {
      dispatch(removeFavorite(item.id.toString()));
    }
  };

  const handleCharacterClick = (id: number) => {
    navigate(`/character/${id}`);
  };

  const renderCharacterCards = (item: Character) => {
    const isFavorite = getFavorite(keys, item);
    return (
      <CharacterCard
        key={item.id}
        data={item}
        isPending={isPending}
        isFavorite={isFavorite}
        onClick={() => handleCharacterClick(item.id)}
        onToggle={(e) => onToggle(e, item)}
        aria-label={`Character card for ${item.name}`}
      />
    );
  };

  const renderSmallCharacterCards = (item: Character) => {
    const isFavorite = getFavorite(keys, item);
    return (
      <SmallCharacterCard
        key={item.id}
        data={item}
        isPending={isPending}
        isFavorite={isFavorite}
        hasToggle
        onClick={() => handleCharacterClick(item.id)}
        onToggle={(e) => onToggle(e, item)}
        aria-label={`Small character card for ${item.name}`}
      />
    );
  };

  if (isPending) {
    return <Spinner />;
  }

  if (!data?.info && !data?.results) {
    return <ResultNotFound />;
  }

  return (
    <>
      <div
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-y-auto p-4"
        role="list"
        aria-label="Character cards grid"
      >
        {data.results.map(renderCharacterCards)}
      </div>
      <div
        className="grid sm:grid-cols-2 p-6 gap-3 overflow-y-auto md:hidden"
        role="list"
        aria-label="Small character cards grid"
      >
        {data.results.map(renderSmallCharacterCards)}
      </div>
      <PaginationList
        currentPage={currentPage}
        maxPage={data.info.pages}
        setCurrentPage={setCurrentPage}
        className="p-4 mt-auto"
      />
    </>
  );
};

export default CharactersListItems;
