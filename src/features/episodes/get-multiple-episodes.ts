import type { Episode } from "./types";

export const getMultipleEpisodes = async (
  ids: string
): Promise<Episode[]> => {
  const address = `https://rickandmortyapi.com/api/episode/${ids}`;
  const url = new URL(address);

  const response = await fetch(url);

  return response.json();
};
