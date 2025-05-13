import { useParams } from 'react-router-dom';

import Character from '../features/character/character';

const CharacterPage = () => {
  const { characterId } = useParams();

  return (
      <Character id={characterId} />
  );
};

export default CharacterPage;
