import { Link, useParams } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';

import BackButton from '../backButton';
import Character from '../character/character';
import EpisodeCard from '../episodes/episodeCard';
import { getEpisodeById } from '../episodes/get-episode-by-id';
import Navigation from '../navigation/navigation';
import ResultNotFound from '../resultNotFound';

import type { Episode } from "../episodes/types";

const extractCharacterId = (url: string): string => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.slice(
    parsedUrl.pathname.lastIndexOf("/"),
    parsedUrl.pathname.length
  );
};

const Episode = () => {
  const { episodeId } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["episodeData", episodeId],
    queryFn: () => getEpisodeById(episodeId),
    enabled: !!episodeId,
  });

  if (isPending) {
    return <Spinner size="lg" />;
  }

  if (!data || error) {
    return <ResultNotFound />;
  }

  if ("error" in data) {
    return <div className="text-red-500 text-center p-4">{data.error}</div>;
  }

  return (
    <>
      <Navigation />
      <div className="p-2 space-y-2 overflow-y-auto">
        <EpisodeCard data={data} />
        <div className="text-pickle-400">Residents:</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {data.characters.map((resident) => {
            const characterId = extractCharacterId(resident);
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
