import { useParams } from 'react-router-dom';

import Character from '@/features/character/character';

const CharacterPage = () => {
  const { characterId } = useParams();

  return (
    <div className="h-[calc(100vh-56px)] grid place-content-center gap-2">
      <Character id={characterId} />
    </div>
  );
};

export default CharacterPage;
