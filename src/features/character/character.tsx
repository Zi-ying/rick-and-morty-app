import { Link, useParams } from 'react-router-dom';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Image from '../../components/image';
import { Button } from '../../components/ui/button';
import { CardTitle } from '../../components/ui/card';
import Spinner from '../../components/ui/spinner';
import { cn } from '../../lib/utils';
import NotFoundPage from '../../pages/NotFoundPage';
import { getCharacterById } from './get-character-by-id';

import type { Character } from "../../types/types";

const Character = () => {
  const { id } = useParams();

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

  if (isError) {
    return <NotFoundPage errorMessage={error.message} />;
  }

  return (
    <div className="grid items-center justify-center gap-4 p-4">
      {isPending && <Spinner />}
      {data && (
        <div className="flex flex-col w-fit md:flex-row gap-4 border rounded-xl shadow-lg p-4 justify-center">
          <Image
            src={data.image}
            alt={`image of ${data.name} from Rick and Morty`}
            className="rounded-xl"
            isPending={isPending}
          />
          <div className="flex flex-col gap-4 p-4 text-slate-500 md:items-start md:justify-center">
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
              {data.name} is {data.status.toLocaleLowerCase()}
            </div>
            <div className="md:text-start">
              {data.name} is a {data.gender.toLocaleLowerCase()}
            </div>
            <div className="md:text-start">
              {data.name} is a {data.species.toLocaleLowerCase()}
            </div>
            {data.type ? (
              <div className="md:text-start">
                {data.name} is {data.type.toLocaleLowerCase()}
              </div>
            ) : (
              <></>
            )}
            <div className="md:text-start">
              {data.name} is often located here on{" "}
              <span className="text-align font-semibold">
                {data.location.name}
              </span>
            </div>
            {data.origin.name ? (
              <div className="md:text-start">
                {data.origin.name !== "unknown" ? (
                  <>
                    {data.name} is originally from{" "}
                    <span className="text-align font-semibold">
                      {data.origin.name}
                    </span>
                  </>
                ) : (
                  <>We do not know where {data.name} is from!</>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      <Link to="/character">
        <Button className="self-place-end">Go back</Button>
      </Link>
    </div>
  );
};

export default Character;
