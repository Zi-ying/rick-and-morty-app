import { useState } from 'react';

import { getAllLocations } from '@/features/locations/get-all-locations';
import LocationsList from '@/features/locations/locationsList';
import Navigation from '@/features/navigation';
import SearchField from '@/features/searchFields/SearchField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const LocationsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const timeout = 500;
  const debouncedSearch = useDebounce(search, timeout);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data } = useQuery({
    queryKey: ["locationsData", debouncedSearch],
    queryFn: () => getAllLocations({ filter: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <Navigation>
        <SearchField
          placeholder="Search for a location"
          value={search}
          onChange={onChange}
          className="justify-self-center max-w-96"
        />
      </Navigation>
      <div className="bg-red-400 p-2 grid items-center gap-2">
        <div className='bg-red-300 text-center'>LOCATIONS</div>
        <LocationsList data={data} page={page} onPage={setPage} />
      </div>
    </>
  );
};

export default LocationsPage;
