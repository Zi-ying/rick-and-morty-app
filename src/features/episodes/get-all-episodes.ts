import { Pagination } from '@/types/pagination';

import type { Episode, EpisodeFilters } from './types';

const address = "https://rickandmortyapi.com/api/episode";

interface GetAllEpisodesParams {
  filters: EpisodeFilters;
  page: string;
}

export const getAllEpisodes = async ({
  filters,
  page,
}: GetAllEpisodesParams): Promise<{
  results: Episode[];
  info: Pagination;
}> => {
  const url = new URL(address);

  url.searchParams.append("name", filters.name);
  url.searchParams.append("episode", filters.episode);
  url.searchParams.append("page", page);

  const response = await fetch(url);
  return response.json();
};
