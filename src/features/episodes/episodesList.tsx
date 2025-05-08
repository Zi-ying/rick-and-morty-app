import { Link } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';

import EpisodeCard from './episodeCard';

import type { Episode } from "@/types/types";
interface EpisodesListProps {
  data: Episode[];
  isPending: boolean;
}

const EpisodesList = ({
  data,
  isPending,
}: EpisodesListProps) => {

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      {data.map((item) => {
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
