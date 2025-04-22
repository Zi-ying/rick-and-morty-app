import { Link } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';

import DataNotFound from '../dataNotFound';
import { getPagination } from '../pagination/get-pagination';
import PaginationList from '../pagination/paginationList';
import EpisodeCard from './episodeCard';

import type { Episode, PaginationParams } from "@/types/types";
interface EpisodesListProps {
  data: { results: Episode[]; info: PaginationParams } | undefined;
  isPending: boolean;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const EpisodesList = ({ data, isPending, currentPage, setPage }: EpisodesListProps) => {

  if (isPending) {
    return <Spinner/>
  }

  if (!data?.info && !data?.results) {
    return <DataNotFound />;
  }

  const maxPage = data.info.pages;

  const {
    page,
    isFirstPage,
    isLastPage,
    setFirstPage,
    setLastPage,
    setNextPage,
    setPreviousPage,
  } = getPagination(currentPage, maxPage, setPage);

  return (
    <div className="bg-red-300 grid md:grid-cols-2 gap-2">
      {data.results.map((item) => {
        return (
          <Link key={item.id} to={item.id.toString()}>
            <EpisodeCard data={item} />
          </Link>
        );
      })}
      <PaginationList
        page={page}
        maxPage={maxPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        setPage={setPage}
        onFirstPage={setFirstPage}
        onLastPage={setLastPage}
        onPreviousPage={setPreviousPage}
        onNextPage={setNextPage}
      />
    </div>
  );
};

export default EpisodesList;
