import type { Character, FilterParams, Pagination } from "./types";

const address = "https://rickandmortyapi.com/api/character";

export const getAllCharacters = async (
  filters: FilterParams,
  pageParam: string
): Promise<{ results: Character[]; info: Pagination }> => {
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
