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
import EpisodeCard from './episodeCard';
import EpisodeChips from './episodeChips';
import { getAllEpisodes } from './get-all-episodes';
import { episodeOptions } from './options';

import type { EpisodeFilters } from "./types";

const DEBOUNCE_TIMEOUT = 500;

const EpisodesList = () => {
  const filters = useSelector(allFilters).episode;
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(filters.name);
  const debouncedSearch = useDebounce(search, DEBOUNCE_TIMEOUT);

  const filterArgs: EpisodeFilters = {
    name: filters.name,
    episode: filters.episode,
  };

  const { data, isPending } = useQuery({
    queryKey: ["episodesData", filterArgs, page],
    queryFn: () =>
      getAllEpisodes({ filters: filterArgs, page: page.toString() }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    dispatch(
      addFilter({ category: "episode", key: "name", value: debouncedSearch })
    );
  }, [dispatch, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setPage(1);
  };

  const handleClearFilter = (filter: keyof EpisodeFilters) => {
    dispatch(removeOneFilter({ category: "episode", key: filter }));
    setPage(1);
  };

  const handleEpisodeFilter = (value: string) => {
    dispatch(addFilter({ category: "episode", key: "episode", value }));
    setPage(1);
  };

  if (isPending) {
    return (
      <div className="h-[calc(100vh-56px)] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const hasNoData = !data?.info && !data?.results;

  return (
    <>
      <Navigation>
        <SearchInput
          placeholder="Search by character name"
          value={search}
          onChange={handleSearchChange}
          className="p-4 text-white col-start-2 col-end-4"
        />
      </Navigation>
      <div className="grid justify-center items-center text-white w-full p-4">
        <SelectInput
          placeholder="Episodes"
          value={filters.episode}
          data={episodeOptions}
          onChange={handleEpisodeFilter}
        />
        <EpisodeChips
          filters={filters}
          onClearOne={handleClearFilter}
          onClearAll={handleResetFilters}
        />
      </div>

      {hasNoData ? (
        <ResultNotFound />
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto p-4">
            {data.results.map((item) => (
              <Link key={item.id} to={item.id.toString()}>
                <EpisodeCard data={item} />
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

export default EpisodesList;
