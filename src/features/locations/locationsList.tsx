import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch } from '@/store/redux-hooks';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { SearchInput, SelectInput } from '../inputs';
import Navigation from '../navigation/navigation';
import PaginationList from '../pagination/paginationList';
import ResultNotFound from '../resultNotFound';
import { getAllLocations } from './get-all-locations';
import LocationCard from './locationCard';
import LocationChips from './locationChips';
import { dimensionOptions, locationTypeOptions } from './options';

import type { LocationFilters } from "./types";

const DEBOUNCE_TIMEOUT = 500;

const LocationsList = () => {
  const filters = useSelector(allFilters).location;
  const [search, setSearch] = useState<string>(filters.name);
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(search, DEBOUNCE_TIMEOUT);

  useEffect(() => {
    dispatch(addFilter({ category: 'location', key: "name", value: debouncedSearch }));
  }, [dispatch, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (key: keyof LocationFilters, value: string) => {
    dispatch(addFilter({category: 'location', key, value }));
    setPage(1);
  };

  const handleClearFilter = (filter: keyof LocationFilters) => {
    dispatch(removeOneFilter({category: 'location', key: filter}));
    setPage(1);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setPage(1);
  };

  const filterArgs: LocationFilters = {
    name: filters.name,
    type: filters.type,
    dimension: filters.dimension,
  };

  const { data, isPending } = useQuery({
    queryKey: ["locationsData", filterArgs, page],
    queryFn: () => getAllLocations({ filters: filterArgs, page: page.toString() }),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return (
      <div className="h-[calc(100vh-56px)] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Navigation>
        <SearchInput
          placeholder="Search for a location"
          value={search}
          className="p-4 text-white col-start-2 col-end-4"
          onChange={handleSearchChange}
        />
      </Navigation>
      <div className="flex flex-col md:flex-row gap-2 text-white w-full p-4">
        <SelectInput
          placeholder="type"
          value={filters.type}
          data={locationTypeOptions}
          onChange={(e) => handleFilterChange("type", e)}
          className="w-full"
        />
        <SelectInput
          placeholder="dimension"
          value={filters.dimension}
          data={dimensionOptions}
          onChange={(e) => handleFilterChange("dimension", e)}
          className="w-full"
        />
      </div>
      <LocationChips
        filters={filters}
        onClearOne={handleClearFilter}
        onClearAll={handleResetFilters}
        className="self-center"
      />
      {!data?.info && !data?.results ? (
        <ResultNotFound />
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 p-4 overflow-y-auto">
            {data.results.map((item) => (
              <Link key={item.id} to={item.id.toString()}>
                <LocationCard data={item} />
              </Link>
            ))}
          </div>
          <PaginationList
            currentPage={page}
            maxPage={data?.info.pages ?? 0}
            setCurrentPage={setPage}
            className="p-4 mt-auto"
          />
        </>
      )}
    </>
  );
};

export default LocationsList;
