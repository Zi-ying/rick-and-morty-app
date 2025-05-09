import { Circle } from 'lucide-react';

import Image from '@/components/image';
import { CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/pages/NotFoundPage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import BackButton from '../backButton';
import ResultsNotFound from '../resultsNotFound';
import { getCharacterById } from './get-character-by-id';
import SmallCharacterCard from './smallCharacterCard';

import type { Character } from "@/types/types";
interface CharacterProps {
  id?: string;
  isSmallCard?: boolean;
}

const Character = ({ id, isSmallCard }: CharacterProps) => {
  const { data, isPending, error, isError } = useQuery<Character>({
    queryKey: ["characterData", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("This id is undefined");
      }

      try {
        const response = await getCharacterById(id);

        if (!response || !response.id) {
          throw new Error("Character not found.");
        }
        return response;
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred."
        );
      }
    },
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <NotFoundPage errorMessage={error.message} />;
  }

  if (!data) {
    return <ResultsNotFound />;
  }

  if (isSmallCard) {
    return <SmallCharacterCard data={data} isPending={isPending} />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 rounded-xl shadow-md justify-center text-white backdrop-blur-md">
        <Image
          src={data.image}
          alt={`image of ${data.name} from Rick and Morty`}
          className="md:rounded-l-md rounded-t-md md:rounded-tr-none flex-none"
        />
        <div className="flex flex-col gap-4 p-4 md:items-start md:justify-center md:grow">
          <CardTitle className="flex gap-2 items-center justify-center">
            <div className="text-pickle-500 font-semibold md:text-start text-md md:text-xl">
              {data.name}
            </div>
            <Circle
              className={cn(
                "h-2.5 stroke-2.5",
                data.status === "Alive" && "stroke-green-400 fill-green-400",
                data.status === "unknown" && "stroke-green-400",
                data.status === "Dead" && "stroke-slate-700 fill-slate-700"
              )}
            />
          </CardTitle>
          <div className="grid md:grid-cols-2 items-center justify-center gap-2">
            <div>
              <p className="text-pickle-500 text-lg">Status</p>
              <p className="whitespace-nowrap">
                {data.status.toLocaleLowerCase()}
              </p>
            </div>
            <div>
              <p className="text-pickle-500 text-lg">Gender</p>
              <p className="whitespace-nowrap">
                {data.gender.toLocaleLowerCase()}
              </p>
            </div>
            <div>
              <p className="text-pickle-500 text-lg">Species</p>
              <p className="whitespace-nowrap">
                {data.species.toLocaleLowerCase()}
              </p>
            </div>
            <div>
              <p className="text-pickle-500 text-lg">Type</p>
              <p className="whitespace-nowrap">
                {data.type ? data.type.toLocaleLowerCase() : "none"}
              </p>
            </div>
            <div>
              <p className="text-pickle-500 text-lg">Location</p>
              <p className="whitespace-nowrap">{data.location.name}</p>
            </div>
            <div>
              <p className="text-pickle-500 text-lg">Episodes</p>
              <p className="whitespace-nowrap">{data.episode.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto">
        <BackButton />
      </div>
    </>
  );
};

export default Character;
