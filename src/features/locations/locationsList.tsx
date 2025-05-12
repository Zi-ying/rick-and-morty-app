import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch } from '@/store/redux-hooks';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import ExpansionButton from '../expansionButton';
import PaginationList from '../pagination/paginationList';
import ResultsNotFound from '../resultsNotFound';
import FilterBadges from '../searchFields/filterBadges';
import SearchInput from '../searchFields/searchInput';
import SelectInput from '../searchFields/selectInput';
import { getAllLocations } from './get-all-locations';
import LocationCard from './locationCard';
import { dimensionOptions, locationTypeOptions } from './options';

import type { Filters, LocationFilterParams } from "@/types/types";
const LocationsList = () => {
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

  const { data, isPending } = useQuery({
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
    <div className="grid gap-2 p-2 sticky top-14 z-10 bg-home bg-fixed">
      <div className="grid grid-cols-4 gap-2">
        <SearchInput
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
          "",
          isExpanded ? "grid grid-cols-2 gap-2 m-auto text-white" : "hidden"
        )}
      >
        <SelectInput
          placeholder="type"
          value={filters.locationType}
          data={locationTypeOptions}
          onChange={(e) => {
            dispatch(addFilter({ key: "locationType", value: e }));
            setPage(1);
          }}
          className="w-full"
        />
        <SelectInput
          placeholder="dimension"
          value={filters.dimension}
          data={dimensionOptions}
          onChange={(e) => {
            dispatch(addFilter({ key: "dimension", value: e }));
            setPage(1);
          }}
          className="w-full"
        />
      </div>
      <FilterBadges
        filters={filters}
        onClearOne={handleClear}
        onClearAll={onResetClick}
        className="flex flex-wrap gap-2 justify-center items-center"
      />
      {data?.info && (
        <PaginationList
          currentPage={page}
          maxPage={data?.info.pages ?? 0}
          setCurrentPage={setPage}
        />
      )}
      {isPending && <Spinner />}
      {!data?.info && !data?.results ? (
        <ResultsNotFound />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {data.results.map((item) => {
            return (
              <Link key={item.id} to={item.id.toString()}>
                <LocationCard data={item} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationsList;
