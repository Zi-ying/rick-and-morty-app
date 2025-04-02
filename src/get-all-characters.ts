import { Character, Pagination } from './types';

export const getAllCharacters = async (): Promise<{ results: Character[]; info: Pagination }> => {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character?cursor="
  );
  return response.json();
};
