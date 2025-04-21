import { useState } from 'react';

import { getAllLocations } from '@/features/locations/get-all-locations';
import LocationsList from '@/features/locations/locationsList';
import Navigation from '@/features/navigation';
import PaginationList from '@/features/pagination/paginationList';
import { usePagination } from '@/features/pagination/use-pagination';
import SearchField from '@/features/searchFields/SearchField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const LocationPage = () => {
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

  const maxPage = data?.info.pages ?? 0;

  const { setFirstPage, setLastPage, setNextPage, setPreviousPage } =
    usePagination(page, maxPage, setPage);

  if (!data?.results) {
    return <>No Data found</>;
  }

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
      <div className="bg-red-400 p-2 grid gap-2">
        <div>LOCATIONS</div>
        <div className="bg-red-300 grid md:grid-cols-2 gap-2">
          <LocationsList data={data.results} />
        </div>
        <PaginationList
          page={page}
          maxPage={maxPage}
          onFirstPage={setFirstPage}
          onLastPage={setLastPage}
          onPreviousPage={setPreviousPage}
          onNextPage={setNextPage}
        />
      </div>
    </>
  );
};

export default LocationPage;
