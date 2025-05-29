import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import { addFilter, allFilters, removeOneFilter, resetFilters } from '@/store/filters-slice';
import { useAppDispatch } from '@/store/redux-hooks';
import { useDebounce } from '@/utils/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { FilterBadges, SearchInput, SelectInput } from '../inputs';
import Navigation from '../navigation';
import PaginationList from '../pagination/paginationList';
import ResultNotFound from '../resultNotFound';
import EpisodeCard from './episodeCard';
import { getAllEpisodes } from './get-all-episodes';
import { episodeOptions } from './options';

import type { EpisodeFilters } from "./types";
import type { Filters } from "@/types/filters";
const EpisodesList = () => {
  const filters = useSelector(allFilters);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(filters.episodeName);
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
          placeholder="Search by character name"
          value={search}
          onChange={onChange}
          className="p-4 text-white col-start-2 col-end-4"
        />
      </Navigation>
      <div className="grid justify-center items-center text-white w-full p-4">
        <SelectInput
          placeholder="Episodes"
          value={filters.episode}
          data={episodeOptions}
          onChange={setFilter}
        />
        <FilterBadges
          filters={filters}
          onClearOne={handleClear}
          onClearAll={onResetClick}
        />
      </div>

      {!data?.info && !data?.results ? (
        <ResultNotFound />
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto p-4">
            {data.results.map((item) => {
              return (
                <Link key={item.id} to={item.id.toString()}>
                  <EpisodeCard data={item} />
                </Link>
              );
            })}
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
