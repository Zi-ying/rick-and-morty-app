import type { Character } from "@/types/types";

export const getMultipleCharacters = async (
  ids: string
): Promise<Character[] | Character> => {
  const address = `https://rickandmortyapi.com/api/character/${ids}`;
  const url = new URL(address);

  const response = await fetch(url);

  return response.json();
};
