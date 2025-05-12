import type { Pagination } from "@/types/pagination";
import type { Character, CharacterFilters } from './types';

const address = "https://rickandmortyapi.com/api/character";

export const getAllCharacters = async (
  filters: CharacterFilters,
  page: string
): Promise<{ results: Character[]; info: Pagination }> => {
  const url = new URL(address);
  url.searchParams.append("name", filters.name);
  url.searchParams.append("gender", filters.gender);
  url.searchParams.append("species", filters.species);
  url.searchParams.append("status", filters.status);
  url.searchParams.append("type", filters.type);
  url.searchParams.append("page", page);
  const response = await fetch(url);
  return response.json();
};
