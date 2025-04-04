import { cn } from '../lib/utils';
import { Character } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface CharacterCardProps {
  data: Character;
}

const CharacterCard = ({ data }: CharacterCardProps) => {
  return (
    <Card className="p-4 rounded-xl shadow-lg">
      <img
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
        className="rounded-xl"
      />
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardContent className='flex gap-2 items-center justify-center'>
          <div className={cn("rounded-full w-2 h-2", data.status === 'Alive' && 'bg-green-400', data.status === 'unknown' && 'bg-slate-500', data.status === 'Dead' && 'bg-red-500')} />
          <p>{data.status}</p>
        </CardContent>
        <CardContent>{data.gender}</CardContent>
        <CardContent>{data.species}</CardContent>
        <CardContent>{data.type ? data.type : "No data"}</CardContent>
      </CardHeader>
    </Card>
  );
};

export default CharacterCard;
