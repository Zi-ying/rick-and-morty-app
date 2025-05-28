import { Link, useParams } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';

import BackButton from '../backButton';
import Character from '../character/character';
import EpisodeCard from '../episodes/episodeCard';
import { getEpisodeById } from '../episodes/get-episode-by-id';
import Navigation from '../navigation';
import ResultNotFound from '../resultNotFound';

import type { Episode } from "../episodes/types";

const Episode = () => {
  const { episodeId } = useParams();

  const isStatus200 = (
    episode: Episode | { error: string }
  ): episode is Episode => {
    return (episode as Episode).id !== undefined;
  };

  const { data, isPending } = useQuery({
    queryKey: ["episodeData", episodeId],
    queryFn: async () => getEpisodeById(episodeId),
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return <ResultNotFound />;
  }

  if (!isStatus200(data)) {
    return <>{data.error}</>;
  }

  return (
    <>
      <Navigation />
      <div className="p-2 space-y-2 overflow-y-auto">
        <EpisodeCard data={data} />
        <div className="text-pickle-400">Residents:</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {data.characters.map((resident) => {
            const url = new URL(resident);
            const characterId = url.pathname.slice(
              url.pathname.lastIndexOf("/"),
              url.pathname.length
            );

            return (
              <Link key={characterId} to={`/character${characterId}`}>
                <Character id={characterId} isSmallCard />
              </Link>
            );
          })}
        </div>
      </div>
      <BackButton className="mx-auto my-2" />
    </>
  );
};

export default Episode;
