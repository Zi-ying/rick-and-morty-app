import { Link } from 'react-router-dom';

import { Character } from '../../types/types';
import SmallCharacterCard from '../character/smallCharacterCard';
import CharacterCard from './characterCard';

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
            to={item.id.toString()}
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
