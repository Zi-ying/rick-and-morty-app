import { Link, useParams } from 'react-router-dom';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '../../components/ui/button';
import { CardTitle } from '../../components/ui/card';
import Spinner from '../../components/ui/spinner';
import { cn } from '../../lib/utils';
import NotFoundPage from '../../pages/NotFoundPage';
import { getCharacterById } from './get-character-by-id';

import type { Character } from '../../types/types';
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
    <div className="grid gap-4 h-[100vh] items-center justify-center p-4">
      {isPending && <Spinner />}
      {data && (
        <>
          <div className="grid md:flex gap-4 border rounded-xl shadow-lg p-4">
            <img
              src={data.image}
              alt={`image of ${data.name} from Rick and Morty`}
              className=" justify-self-center rounded-lg md:rounded-full md:h-60 md:w-60 lg:h-80 lg:w-80"
            />
            <div className="md:inline-flex flex-col gap-4 p-4 text-slate-500 md:items-start md:justify-center">
              <CardTitle className="flex gap-2 items-center justify-center">
                <div className="text-brand-500 text-end font-semibold text-md md:text-xl">
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
              <div>
                {data.name} is {data.status.toLocaleLowerCase()}
              </div>
              <div>
                {data.name} is a {data.gender.toLocaleLowerCase()}
              </div>
              <div>
                {data.name} is a {data.species.toLocaleLowerCase()}
              </div>
              {data.type ? (
                <div>
                {data.name} is {data.type.toLocaleLowerCase()}
                </div>
              ) : (
                <></>
              )}
              <div>
                {data.name} is often located here on{" "}
                <span className="text-align font-semibold">
                  {data.location.name}
                </span>
              </div>
              {data.origin.name ? (
                <div>
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
          <Link to="/">
            <Button>Go back</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Character;
