import { Circle } from 'lucide-react';

import Image from '@/components/image';
import { CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/pages/NotFoundPage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import BackButton from '../backButton';
import Navigation from '../navigation/navigation';
import ResultNotFound from '../resultNotFound';
import { getCharacterById } from './get-character-by-id';
import SmallCharacterCard from './smallCharacterCard';

import type { Character } from "../characters/types";

interface CharacterProps {
  id: string | undefined;
  isSmallCard?: boolean;
}

const Character = ({ id, isSmallCard }: CharacterProps) => {
  const { data, isPending, error, isError } = useQuery<Character>({
    queryKey: ["characterData", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Character ID is required");
      }

      const response = await getCharacterById(id);

      if (!response?.id) {
        throw new Error("Character not found");
      }

      return response;
    },
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <NotFoundPage errorMessage={error instanceof Error ? error.message : "An unexpected error occurred"} />;
  }

  if (!data) {
    return <ResultNotFound />;
  }

  if (isSmallCard) {
    return <SmallCharacterCard data={data} isPending={isPending} />;
  }

  const renderCharacterInfo = (label: string, value: string | number) => (
    <div>
      <p className="text-pickle-500 text-lg">{label}</p>
      <p className="whitespace-nowrap">{value}</p>
    </div>
  );

  return (
    <>
      <Navigation />
      <div className="grid place-content-center gap-2 h-full">
        <div className="flex flex-col md:flex-row gap-4 rounded-xl shadow-md justify-center text-white backdrop-blur-md">
          <Image
            src={data.image}
            alt={`${data.name} from Rick and Morty`}
            className="md:rounded-l-md rounded-t-md md:rounded-tr-none flex-none"
          />
          <div className="flex flex-col gap-4 p-4 md:items-start md:justify-center md:grow">
            <CardTitle className="flex gap-2 items-center justify-center">
              <p className="text-pickle-500 font-semibold md:text-start text-md md:text-xl">
                {data.name}
              </p>
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
              {renderCharacterInfo("Status", data.status.toLowerCase())}
              {renderCharacterInfo("Gender", data.gender.toLowerCase())}
              {renderCharacterInfo("Species", data.species.toLowerCase())}
              {renderCharacterInfo("Type", data.type?.toLowerCase() || "none")}
              {renderCharacterInfo("Location", data.location.name)}
              {renderCharacterInfo("Episodes", data.episode.length)}
            </div>
          </div>
        </div>
        <BackButton className="m-auto" />
      </div>
    </>
  );
};

export default Character;
