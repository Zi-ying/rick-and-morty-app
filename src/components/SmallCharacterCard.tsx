import { Character } from '../types';
import { Card, CardHeader, CardTitle } from './ui/card';

interface SmallCharacterCardProps {
  data: Character;
}

const SmallCharacterCard = ({ data }: SmallCharacterCardProps) => {
  return (
    <Card className="p-4 rounded-xl shadow-lg grid grid-cols-3 items-center">
      <img
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
        className="rounded-full w-16 h-16 col-span-1"
      />
      <CardHeader className='col-span-2'>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SmallCharacterCard;
