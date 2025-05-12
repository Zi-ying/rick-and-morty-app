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
import FilterBadges from '../inputs/filterBadges';
import SearchInput from '../inputs/searchInput';
import SelectInput from '../inputs/selectInput';
import PaginationList from '../pagination/paginationList';
import ResultsNotFound from '../resultsNotFound';
import EpisodeCard from './episodeCard';
import { getAllEpisodes } from './get-all-episodes';
import { episodeOptions } from './options';

import type { EpisodeFilters } from './types';
import type { Filters } from '@/types/filters';

const EpisodesList = () => {
  const filters = useSelector(allFilters);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(filters.episodeName);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const timeout = 500;
  const debouncedSearch = useDebounce(search, timeout);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(addFilter({ key: "episodeName", value: debouncedSearch }));
  }, [dispatch, search, debouncedSearch]);

  const onResetClick = () => {
    dispatch(resetFilters());
    setPage(1);
  };

  const filterArgs: EpisodeFilters = {
    name: filters.episodeName,
    episode: filters.episode,
  };

  const { data, isPending } = useQuery({
    queryKey: ["episodesData", filterArgs, page],
    queryFn: () =>
      getAllEpisodes({ filters: filterArgs, page: page.toString() }),
    placeholderData: keepPreviousData,
  });

  const handleClear = (filter: keyof Filters) => {
    dispatch(removeOneFilter(filter));
    setPage(1);
  };

  const setFilter = (value: string) => {
    dispatch(addFilter({ key: "episode", value }));
    setPage(1);
  };

  return (
    <div className="space-y-2 pt-2">
      <div className="grid grid-cols-4 gap-2">
        <SearchInput
          placeholder="Search for an episode"
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
          "justify-center text-white w-full",
          isExpanded ? "inline-flex" : "hidden"
        )}
      >
        <SelectInput
          placeholder="Episodes"
          value={filters.episode}
          data={episodeOptions}
          onChange={setFilter}
        />
      </div>
      <FilterBadges
        filters={filters}
        onClearOne={handleClear}
        onClearAll={onResetClick}
        className="flex flex-wrap gap-2 justify-center items-center"
      />
      {data?.info && data?.results && (
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
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 p-2">
          {data.results.map((item) => {
            return (
              <Link key={item.id} to={item.id.toString()}>
                <EpisodeCard data={item} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EpisodesList;
