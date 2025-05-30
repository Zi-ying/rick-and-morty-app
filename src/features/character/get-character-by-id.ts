import type { Character } from '../characters/types';

export const getCharacterById = async (id: string): Promise<Character> => {
  const url = `https://rickandmortyapi.com/api/character/${id}`
  const response = await fetch(url);
  return response.json();
}
