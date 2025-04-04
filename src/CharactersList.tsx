import { Link } from 'react-router-dom';

import CharacterCard from './components/CharacterCard';
import { Character } from './types';

interface CharacterListProps {
  data: Character[];
}

const CharactersList = ({ data }: CharacterListProps) => {
  return (
    <>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`${item.id}`}
            className="grid justify-center cursor-pointer"
          >
            <CharacterCard data={item} />
          </Link>
        );
      })}
    </>
  );
};

export default CharactersList;
