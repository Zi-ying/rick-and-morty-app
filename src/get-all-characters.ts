import { Character, Pagination } from './types';

export const getAllCharacters = async (): Promise<{results: Character[], infos: Pagination}> => {
  const response =  await fetch("https://rickandmortyapi.com/api/character");
  return response.json();
};
