import { Link, useParams } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import Character from '@/features/character/character';
import DataNotFound from '@/features/dataNotFound';
import { getEpisodeById } from '@/features/episode/get-episode-by-id';
import { useQuery } from '@tanstack/react-query';

import type { Episode } from "@/types/types";
const EpisodePage = () => {
  const { episodeId } = useParams();

  const isStatus200 = (
    episode: Episode | { error: string }
  ): episode is Episode => {
    return (episode as Episode).id !== undefined;
  }

  const { data, isPending } = useQuery({
    queryKey: ["episodeData", episodeId],
    queryFn: async () => getEpisodeById(episodeId),
  });

  if (isPending) {
    return <Spinner/>
  }

  if (!data) {
    return <DataNotFound />;
  }

  if (!isStatus200(data)) {
    return <>{data.error}</>;
  }

  return (
    <div className="bg-pink-600">
      <div className="bg-pink-500">
        <div>name: {data.name}</div>
        <div>dimension: {data.episode}</div>
        <div>air date: {data.air_date}</div>
      </div>
      <div> residents:</div>
      <div className="grid grid-cols-5">
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
  );
};

export default EpisodePage;
