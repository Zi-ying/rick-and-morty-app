import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ExpansionButton from '@/features/expansionButton';
import { getAllLocations } from '@/features/locations/get-all-locations';
import LocationsList from '@/features/locations/locationsList';
import FilterBadges from '@/features/searchFields/filterBadges';
import { dimensionOptions, locationTypeOptions } from '@/features/searchFields/options';
import SearchField from '@/features/searchFields/SearchField';
import SelectField from '@/features/searchFields/SelectField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import { cn } from '@/lib/utils';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch } from '@/store/redux-hooks';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Filters, LocationFilterParams } from "@/types/types";

const LocationsPage = () => {
  const filters = useSelector(allFilters);
  const [search, setSearch] = useState<string>(filters.locationName);
  const [page, setPage] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const timeout = 500;
  const debouncedSearch = useDebounce(search, timeout);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(addFilter({ key: "locationName", value: debouncedSearch }));
  }, [dispatch, search, debouncedSearch]);

  const onResetClick = () => {
    dispatch(resetFilters());
    setPage(1);
  };

  const filterArgs: LocationFilterParams = {
    name: filters.locationName,
    type: filters.locationType,
    dimension: filters.dimension,
  };

  const { data } = useQuery({
    queryKey: ["locationsData", filterArgs, debouncedSearch, page],
    queryFn: () =>
      getAllLocations({ filters: filterArgs, page: page.toString() }),
    placeholderData: keepPreviousData,
  });

  const handleClear = (filter: keyof Filters) => {
    dispatch(removeOneFilter(filter));
    setPage(1);
  };

  return (
    <div className="space-y-2 p-2">
      <div className="grid grid-cols-4 gap-2">
        <SearchField
          placeholder="Search for a location"
          value={search}
          className="p-4 text-white col-start-2 col-end-4"
          onChange={onChange}
        />
        <ExpansionButton
          expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      <div
        className={cn(
          "bg-red-300 grid grid-cols-1 gap-2 sm:grid-cols-4",
          isExpanded ? "inline-grid" : "hidden"
        )}
      >
        <SelectField
          placeholder="type"
          value={filters.locationType}
          data={locationTypeOptions}
          onChange={(e) => {
            dispatch(addFilter({ key: "locationType", value: e }));
            setPage(1);
          }}
          classnames="w-full"
        />
        <SelectField
          placeholder="dimension"
          value={filters.dimension}
          data={dimensionOptions}
          onChange={(e) => {
            dispatch(addFilter({ key: "dimension", value: e }));
            setPage(1);
          }}
          classnames="w-full"
        />
        <FilterBadges
          filters={filters}
          onClearOne={handleClear}
          onClearAll={onResetClick}
          className="flex flex-wrap gap-2 justify-center items-center"
        />
      </div>
      <div className="bg-red-400 p-2 grid items-center gap-2">
        <div className="bg-red-300 text-center">LOCATIONS</div>
        <LocationsList data={data} currentPage={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default LocationsPage;
