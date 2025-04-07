import { Link } from 'react-router-dom';

import CharacterCard from '../../components/characterCard';
import { Character } from '../../types/types';
import SmallCharacterCard from '../character/smallCharacterCard';

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
