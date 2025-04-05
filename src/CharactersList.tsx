import { Link } from 'react-router-dom';

import CharacterCard from './components/CharacterCard';
import SmallCharacterCard from './components/SmallCharacterCard';
import { Character } from './types';

interface CharacterListProps {
  data: Character[];
  isSmallScreen?: boolean;
}

const CharactersList = ({ data, isSmallScreen }: CharacterListProps) => {
  return (
    <>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`${item.id}`}
            className="grid justify-center cursor-pointer"
          >
            {isSmallScreen ? (
              <SmallCharacterCard data={item} />
            ) : (
              <CharacterCard data={item} />
            )}
          </Link>
        );
      })}
    </>
  );
};

export default CharactersList;
