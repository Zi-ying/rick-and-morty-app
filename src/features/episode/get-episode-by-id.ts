import type { Episode } from "@/types/types";

export const getEpisodeById = async (id?: string): Promise<Episode | {error: string}> => {
  if (!id) {
    throw new Error("Id not found");
  }

  const url = `https://rickandmortyapi.com/api/episode/${id}`;

  const response = await fetch(url);

  return response.json();
};
