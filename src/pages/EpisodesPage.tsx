import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import EpisodesList from '@/features/episodes/episodesList';
import { getAllEpisodes } from '@/features/episodes/get-all-episodes';
import FilterBadges from '@/features/searchFields/filterBadges';
import { episodeOptions } from '@/features/searchFields/options';
import SelectField from '@/features/searchFields/SelectField';
import { useDebounce } from '@/features/searchFields/use-debounce';
import SearchNavigation from '@/features/searchNavigation';
import { cn } from '@/lib/utils';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch } from '@/store/redux-hooks';
import { EpisodeFilterParams, Filters } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

import PaginationList from '../features/pagination/paginationList';
import ResultsNotFound from '../features/resultsNotFound';

const EpisodesPage = () => {
  const filters = useSelector(allFilters);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(filters.episodeName);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isFavoritePage, setIsFavoritePage] = useState<boolean>(false);
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

  const handleClear = (filter: keyof Filters) => {
    dispatch(removeOneFilter(filter));
    setPage(1);
  };

  const setFilter = (value: string) => {
    dispatch(addFilter({ key: "episode", value }));
    setPage(1);
  };

  return (
    <div className="space-y-2">
      <SearchNavigation
        placeholder="Search for an episode"
        value={search}
        onSearchChange={onChange}
        toggled={isFavoritePage}
        onToggle={() => setIsFavoritePage(!isFavoritePage)}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-fit self-stretch [&>svg]:stroke-3"
        >
          {isExpanded ? <Minus /> : <Plus />}
        </Button>
      </SearchNavigation>
      <div
        className={cn(
          "justify-center text-white w-full bg-red-500",
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
