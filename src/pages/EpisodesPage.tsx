import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import EpisodesList from '@/features/episodes/episodesList';
import { getAllEpisodes } from '@/features/episodes/get-all-episodes';
import { episodeOptions } from '@/features/episodes/options';
import ExpansionButton from '@/features/expansionButton';
import PaginationList from '@/features/pagination/paginationList';
import ResultsNotFound from '@/features/resultsNotFound';
import FilterBadges from '@/features/searchFields/filterBadges';
import SearchInput from '@/features/searchFields/searchInput';
import SelectField from '@/features/searchFields/SelectField';
import { cn } from '@/lib/utils';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch } from '@/store/redux-hooks';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { EpisodeFilterParams, Filters } from '@/types/types';

const EpisodesPage = () => {
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

  const filterArgs: EpisodeFilterParams = {
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
        <SelectField
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
      {!data?.info && !data?.results ? (
        <ResultsNotFound />
      ) : (
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 p-2">
          <EpisodesList data={data?.results} isPending={isPending} />
        </div>
      )}
    </div>
  );
};

export default EpisodesPage;
