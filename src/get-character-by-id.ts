import { Character } from './types';

export const getCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  return response.json();
}
