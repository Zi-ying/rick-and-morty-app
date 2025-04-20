import { useState } from 'react';

import { getAllLocations } from '@/features/locations/get-all-locations';
import LocationsList from '@/features/locations/locationsList';
import Navigation from '@/features/navigation';
import SearchField from '@/features/searchFields/SearchField';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useDebounce } from '../features/searchFields/use-debounce';

const LocationPage = () => {
  const [search, setSearch] = useState<string>("");

  const timeout = 500;
  const debouncedSearch = useDebounce(search, timeout);

  const { data } = useQuery({
    queryKey: ["locationsData"],
    queryFn: () => getAllLocations({ filter: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  if (!data?.results) {
    return <>No Data found</>;
  }

  return (
    <>
      <Navigation>
        <SearchField
          placeholder="Search for a location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="justify-self-center max-w-96"
        />
      </Navigation>
      <div className="bg-red-400 grid p-2 gap-2">
        <div>LOCATIONS</div>
        <div className="bg-red-300 grid md:grid-cols-2 gap-2">
          <LocationsList data={data.results} />
        </div>
      </div>
    </>
  );
};

export default LocationPage;
