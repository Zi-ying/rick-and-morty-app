import { Link } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';

import ResultsNotFound from '../resultsNotFound';
import EpisodeCard from './episodeCard';

import type { Episode, PaginationParams } from "@/types/types";
interface EpisodesListProps {
  data: { results: Episode[]; info: PaginationParams } | undefined;
  isPending: boolean;
}

const EpisodesList = ({
  data,
  isPending,
}: EpisodesListProps) => {
  if (isPending) {
    return <Spinner />;
  }

  if (!data?.info && !data?.results) {
    return <ResultsNotFound />;
  }

  return (
    <>
      {data.results.map((item) => {
        return (
          <Link key={item.id} to={item.id.toString()}>
            <EpisodeCard data={item} />
          </Link>
        );
      })}
    </>
  );
};

export default EpisodesList;
