import type { Character, CharacaterFilterParams, PaginationParams } from "../../types/types";

const address = "https://rickandmortyapi.com/api/character";

export const getAllCharacters = async (
  filters: CharacaterFilterParams,
  pageParam: string
): Promise<{ results: Character[]; info: PaginationParams }> => {
  const url = new URL(address);
  url.searchParams.append("name", filters.name);
  url.searchParams.append("gender", filters.gender);
  url.searchParams.append("species", filters.species);
  url.searchParams.append("status", filters.status);
  url.searchParams.append("type", filters.type);
  url.searchParams.append('page', pageParam)
  const response = await fetch(url);
  return response.json();
};
