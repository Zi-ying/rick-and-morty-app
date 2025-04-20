import type { PaginationParams, Location } from "@/types/types";

const address = "https://rickandmortyapi.com/api/location";

interface GetAllLocationsParams {
  filter: string;
}

export const getAllLocations = async ({
  filter,
}: GetAllLocationsParams): Promise<{
  results: Location[];
  info: PaginationParams;
}> => {
  const url = new URL(address);

  url.searchParams.append("name", filter);

  const response = await fetch(url);
  return response.json();
};
