import { Link, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Character from '@/features/character/character';

const CharacterPage = () => {
  const { characterId } = useParams();

  return (
    <div className='h-screen flex'>
      <div className="flex flex-col bg-red-500">
        <Character id={characterId} />
        <Link to="/character" className='mt-auto'>
          <Button>Go back</Button>
        </Link>
      </div>
    </div>
  );
};

export default CharacterPage;
