import { Link, useParams } from 'react-router-dom';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import CharacterCard from './components/CharacterCard';
import { Button } from './components/ui/button';
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

  if (isPending) return "Loading...";

  return (
    <div className="grid gap-4 justify-center">
      <CharacterCard data={data} />
      <Link to="/">
        <Button>Go back</Button>
      </Link>
    </div>
  );
};

export default Character;
