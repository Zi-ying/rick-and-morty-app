import { Link } from 'react-router-dom';

import { useGetCharacters } from './use-get-characters';

const CharactersList = () => {
  const { isPending, error, data } = useGetCharacters()

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {data.results.map((item) => {
        return (
          <Link to={`${item.id}`}>
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-lg shadow-lg grid justify-center p-2 cursor-pointer"
            >
              <img
                src={item.image}
                alt={`image of ${item.name} from Rick and Morty`}
                className="rounded-lg"
              />
              <h5 className="text-gray-700">{item.name}</h5>
              <h5 className="text-gray-500">{item.status}</h5>
              <h5 className="text-gray-500">{item.species}</h5>
              <h5 className="text-gray-500">{item.gender}</h5>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CharactersList;
