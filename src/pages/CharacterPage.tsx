import { Link, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Character from '@/features/character/character';

const CharacterPage = () => {
  const { characterId } = useParams();

  return (
    <div className="h-[calc(100vh-56px)] grid place-content-center gap-2">
      <Character id={characterId} />
      <Link to="/character" className="m-auto">
        <Button>Go back</Button>
      </Link>
    </div>
  );
};

export default CharacterPage;
