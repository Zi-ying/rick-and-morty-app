import type { PaginationParams, Location } from '@/types/types';

const address = 'https://rickandmortyapi.com/api/location';

export const getAllLocations = async (): Promise<{ results: Location[]; info: PaginationParams }> => {
  const url = new URL(address);

  const response = await fetch(url);
  return response.json();
}
