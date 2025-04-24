import { Link } from 'react-router-dom';

import Image from '@/components/image';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/pages/NotFoundPage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import DataNotFound from '../dataNotFound';
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
    return <Spinner />
  }

  if (isError) {
    return <NotFoundPage errorMessage={error.message} />;
  }

  if (!data) {
    return <DataNotFound />;
  }

  if (isSmallCard) {
    return <SmallCharacterCard data={data} isPending={isPending} />;
  }

  return (
    <div className="grid items-center justify-center gap-4 p-4 h-screen">
      {isPending && <Spinner />}
        <div className="flex flex-col w-fit md:flex-row gap-4 rounded-xl shadow-lg p-4 justify-center text-white backdrop-blur-md">
          <Image
            src={data.image}
            alt={`image of ${data.name} from Rick and Morty`}
            className="rounded-xl"
            isPending={isPending}
          />
          <div className="flex flex-col gap-4 p-4md:items-start md:justify-center">
            <CardTitle className="flex gap-2 items-center justify-center">
              <div className="text-brand-500 font-semibold md:text-start text-md md:text-xl">
                {data.name}
              </div>
              <div
                className={cn(
                  "rounded-full w-2 h-2",
                  data.status === "Alive" && "bg-green-400",
                  data.status === "unknown" && "bg-slate-500",
                  data.status === "Dead" && "bg-red-500"
                )}
              />
            </CardTitle>
            <div className="md:text-start">
              Status: {data.status.toLocaleLowerCase()}
            </div>
            <div className="md:text-start">
              Gender: {data.gender.toLocaleLowerCase()}
            </div>
            <div className="md:text-start">
              Species: {data.species.toLocaleLowerCase()}
            </div>
            {data.type ? (
              <div className="md:text-start">
                Type: {data.type.toLocaleLowerCase()}
              </div>
            ) : (
              <></>
            )}
            <div className="md:text-start">
              Located on: {data.location.name}
            </div>
            {data.origin.name ? (
              <div className="md:text-start">
                {data.origin.name !== "unknown" ? (
                  <>Origin: {data.origin.name}</>
                ) : (
                  <>We do not know where {data.name} is from!</>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="md:text-start">
              Episodes: {data.episode.length}
            </div>
        </div>
      <Link to="/character">
        <Button className="self-place-end">Go back</Button>
      </Link>
    </div>
  );
};

export default Character;
