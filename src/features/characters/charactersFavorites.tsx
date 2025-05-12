import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { allFavorites } from '@/store/favorites-slice';
import { useAppSelector } from '@/store/redux-hooks';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import SmallCharacterCard from '../character/smallCharacterCard';
import ResultsNotFound from '../resultsNotFound';
import SearchNavigation from '../searchNavigation';
import CharacterCard from './characterCard';
import { getMultipleCharacters } from './get-multiple-characters';

import type { Character } from "./types";
interface CharactersFavoritesProps {
  isFavoritePage: boolean;
  setIsFavoritePage: React.Dispatch<React.SetStateAction<boolean>>;
  onToggle: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: Character
  ) => void;
}

const CharactersFavorites = ({
  isFavoritePage,
  setIsFavoritePage,
  onToggle,
}: CharactersFavoritesProps) => {
  const keys = useAppSelector(allFavorites);
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");

  const { data, isPending } = useQuery({
    queryKey: ["multipleCharactersData", keys],
    queryFn: async () => getMultipleCharacters(keys.join()),
    placeholderData: keepPreviousData,
  });

  const debouncedValue = useDebounce(value, 500);

  const isCharacter = (data: Character | Character[]): data is Character => {
    return (data as Character).created !== undefined;
  };

  if (!data) {
    return <ResultsNotFound />;
  }

  const newArray: Character[] = [];

  if (isCharacter(data)) {
    newArray.push(data);
  }

  if (!isCharacter(data) && data.length >= 2) {
    newArray.push(...data);
  }

  const filteredData = newArray.filter((d) =>
    d.name.toLowerCase().includes(debouncedValue.toLowerCase())
  );
  const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));

  const getFavorite = (item: Character) => {
    return keys.includes(item.id.toString());
  };

  return (
    <div className="p-2">
      <SearchNavigation
        placeholder="Search by character name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        toggled={isFavoritePage}
        onToggle={() => setIsFavoritePage(!isFavoritePage)}
      />
      {filteredData && filteredData.length !== 0 ? (
        <>
          <div className="w-full hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 p-6">
            {sortedData.map((item) => {
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
            {sortedData.map((item) => {
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
        <ResultsNotFound />
      )}
    </div>
  );
};

export default CharactersFavorites;
