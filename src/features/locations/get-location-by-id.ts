import type { Location } from "@/types/types";

export const getLocationById = async (id?: string): Promise<Location | {error: string}> => {
  if (!id) {
    throw new Error("Id not found");
  }

  const url = `https://rickandmortyapi.com/api/location/${id}`;

  const response = await fetch(url);

  return response.json();
};
