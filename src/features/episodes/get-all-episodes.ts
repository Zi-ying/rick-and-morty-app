import type { PaginationParams, EpisodeFilterParams, Episode } from "@/types/types";

const address = "https://rickandmortyapi.com/api/episode";

interface GetAllEpisodesParams {
  filters: EpisodeFilterParams;
  page: string;
}

export const getAllEpisodes = async (
  {
  filters,
  page,
}: GetAllEpisodesParams
): Promise<{
  results: Episode[];
  info: PaginationParams;
}> => {
  const url = new URL(address);

  url.searchParams.append("name", filters.name);
  url.searchParams.append("episode", filters.episode);
  url.searchParams.append("page", page);

  const response = await fetch(url);
  return response.json();
};
