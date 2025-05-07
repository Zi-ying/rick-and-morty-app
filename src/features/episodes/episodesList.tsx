import { Link } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';

import PaginationList from '../pagination/paginationList';
import ResultsNotFound from '../resultsNotFound';
import EpisodeCard from './episodeCard';

import type { Episode, PaginationParams } from "@/types/types";
interface EpisodesListProps {
  data: { results: Episode[]; info: PaginationParams } | undefined;
  isPending: boolean;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const EpisodesList = ({
  data,
  isPending,
  currentPage,
  setPage,
}: EpisodesListProps) => {
  if (isPending) {
    return <Spinner />;
  }

  if (!data?.info && !data?.results) {
    return <ResultsNotFound />;
  }

  const maxPage = data.info.pages;


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
        currentPage={currentPage}
        maxPage={maxPage}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default EpisodesList;
