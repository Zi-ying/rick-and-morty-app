import type { PaginationParams, Location, LocationFilterParams } from "@/types/types";

const address = "https://rickandmortyapi.com/api/location";

interface GetAllLocationsParams {
  filters: LocationFilterParams;
  page: string;
}

export const getAllLocations = async ({
  filters,
  page,
}: GetAllLocationsParams): Promise<{
  results: Location[];
  info: PaginationParams;
}> => {
  const url = new URL(address);

  url.searchParams.append("name", filters.name);
  url.searchParams.append("type", filters.type);
  url.searchParams.append("dimension", filters.dimension);
  url.searchParams.append("page", page);

  const response = await fetch(url);
  return response.json();
};
