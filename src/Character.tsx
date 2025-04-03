import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

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
  });

  if (isError) {
    return <NotFoundPage errorMessage={error.message} />;
  }

  if (isPending) return "Loading...";

  return (
    <div className='grid gap-4'>
      <div className="bg-white border border-gray-100 rounded-lg shadow-lg grid justify-center p-2 cursor-pointer">
        <img
          src={data.image}
          alt={`image of ${data.name} from Rick and Morty`}
          className="rounded-lg"
        />
        <h5 className="text-gray-700">{data.name}</h5>
        <h5 className="text-gray-500">{data.status}</h5>
        <h5 className="text-gray-500">{data.species}</h5>
        <h5 className="text-gray-500">{data.gender}</h5>
        <h5 className="text-gray-500">{data.type}</h5>
      </div>
      <Link to='/'>
        <button>Go back</button>
      </Link>
    </div>
  );
};

export default Character;
