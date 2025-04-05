import { Link, useParams } from 'react-router-dom';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import CharacterCard from './components/CharacterCard';
import { Button } from './components/ui/button';
import Spinner from './components/ui/spinner';
import { getCharacterById } from './get-character-by-id';
import NotFoundPage from './NotFoundPage';

import type { Character } from "./types";
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
          <div className='grid md:flex gap-4'>
            <CharacterCard data={data} />
            <div className="md:inline-flex flex-col gap-4 p-4 text-brand-500 items-start justify-center">
              <div>You can find more about <span className='text-align font-semibold'>{data.name}</span></div>
              <div>{data.name} is often located here on <span className='text-align font-semibold'>{data.location.name}</span></div>
              <div>{data.name} is originally from <span className='text-align font-semibold'>{data.origin.name}</span></div>
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
