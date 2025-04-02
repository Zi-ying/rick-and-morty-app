import type { Character, FilterParams, Pagination } from './types';

export const getAllCharacters = async (filters: FilterParams): Promise<{ results: Character[]; info: Pagination }> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${filters.name}&status=${filters.status}&species=${filters.species}&type=${filters.type}&gender=${filters.gender}`
  );
  return response.json();
};
