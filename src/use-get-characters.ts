import { useQuery } from '@tanstack/react-query';

import { Character, Pagination } from './types';

export const useGetCharacters = () => {
  return useQuery<{
    results: Character[];
    infos: Pagination;
  }>({
    queryKey: ["charactersData"],
    queryFn: () =>
      fetch("https://rickandmortyapi.com/api/character").then((res) =>
        res.json()
      ),
  });
}
