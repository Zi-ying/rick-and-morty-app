import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import { addFavorite, allFavorites, removeFavorite } from '@/store/favorites-slice';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import SmallCharacterCard from '../character/smallCharacterCard';
import CharacterCard from '../characters/characterCard';
import { Character } from '../characters/types';
import { getFavorite } from '../get-favorite';
import { SearchInput } from '../inputs';
import Navigation from '../navigation/navigation';
import ResultNotFound from '../resultNotFound';
import { getMultipleCharacters } from './get-multiple-characters';

const FavoriteList = () => {
  const keys = useAppSelector(allFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");

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

  const { data, isPending } = useQuery({
    queryKey: ["multipleCharactersData", keys],
    queryFn: async () => getMultipleCharacters(keys.join()),
    placeholderData: keepPreviousData,
  });

  const debouncedValue = useDebounce(value, 500);

  const isCharacter = (data: Character | Character[]): data is Character => {
    return (data as Character).created !== undefined;
  };

  const newArray: Character[] = [];

  if (data && isCharacter(data)) {
    newArray.push(data);
  }

  if (data && !isCharacter(data) && data.length >= 2) {
    newArray.push(...data);
  }

  const filteredData = newArray.filter((d) =>
    d.name.toLowerCase().includes(debouncedValue.toLowerCase())
  );
  const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));

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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-4 text-white col-start-2 col-end-4"
        />
      </Navigation>
      {filteredData && filteredData.length !== 0 ? (
        <div className='p-4 overflow-auto'>
          <div className="w-full hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6">
            {sortedData.map((item) => {
              const isFavorite = getFavorite(keys, item);

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
              const isFavorite = getFavorite(keys, item);

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
        </div>
      ) : (
        <ResultNotFound />
      )}
    </>
  );
};

export default FavoriteList;
