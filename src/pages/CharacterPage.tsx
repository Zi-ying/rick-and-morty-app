import { useParams } from 'react-router-dom';

import Character from '@/features/character/character';
import Navigation from '@/features/navigation';

const CharacterPage = () => {
  const { characterId } = useParams();

  return (
    <>
      <Navigation />
      <Character id={characterId} />
    </>
  );
};

export default CharacterPage;
