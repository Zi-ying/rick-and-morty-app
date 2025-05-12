import { Link, useParams } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import BackButton from '@/features/backButton';
import Character from '@/features/character/character';
import EpisodeCard from '@/features/episodes/episodeCard';
import { getEpisodeById } from '@/features/episodes/get-episode-by-id';
import ResultsNotFound from '@/features/resultsNotFound';
import { useQuery } from '@tanstack/react-query';

import type { Episode } from "@/features/episodes/types";

const EpisodePage = () => {
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
      <div className="h-[calc(100vh-56px)] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return <ResultsNotFound />;
  }

  if (!isStatus200(data)) {
    return <>{data.error}</>;
  }

  return (
    <div className="p-2 space-y-2">
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
      <div className="flex justify-center">
        <BackButton />
      </div>
    </div>
  );
};

export default EpisodePage;
