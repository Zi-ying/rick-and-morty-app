import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import EpisodesList from '@/features/episodes/episodesList';
import { getAllEpisodes } from '@/features/episodes/get-all-episodes';
import FilterBadges from '@/features/searchFields/filterBadges';
import { episodeOptions } from '@/features/searchFields/options';
import SearchField from '@/features/searchFields/SearchField';
import SelectField from '@/features/searchFields/SelectField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import { cn } from '@/lib/utils';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch } from '@/store/redux-hooks';
import { EpisodeFilterParams, Filters } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

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
  });

  const onExpansionClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClear = (filter: keyof Filters) => {
    dispatch(removeOneFilter(filter));
    setPage(1);
  };

  return (
    <>
      <SearchField
        placeholder="Search for an episode"
        value={search}
        onChange={onChange}
        className="justify-self-center max-w-96"
      />
      <FilterBadges
        filters={filters}
        onClearOne={handleClear}
        onClearAll={onResetClick}
        className="flex flex-wrap gap-2 justify-center items-center"
      />
      <Button
        onClick={onExpansionClick}
        className={cn("justify-self-center", isExpanded ? "rotate-180" : "")}
      >
        V
      </Button>
      <div
        className={cn(
          "bg-red-300 grid grid-cols-1 gap-2 sm:grid-cols-4",
          isExpanded ? "inline-grid" : "hidden"
        )}
      >
        <SelectField
          placeholder="type"
          value={filters.episode}
          data={episodeOptions}
          onChange={(e) => {
            dispatch(addFilter({ key: "episode", value: e }));
            setPage(1);
          }}
          classnames="w-full"
        />
      </div>
      <div>Episodes Page</div>
      <EpisodesList
        data={data}
        isPending={isPending}
        currentPage={page}
        setPage={setPage}
      />
    </>
  );
};

export default EpisodesPage;
