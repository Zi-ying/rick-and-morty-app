import { Character } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface CharacterCardProps {
  data: Character
}

const CharacterCard = ({data}: CharacterCardProps) => {
  return (
    <Card className='p-4'>
    <img
      src={data.image}
      alt={`image of ${data.name} from Rick and Morty`}
      className="rounded-lg"
    />
    <CardHeader>
      <CardTitle>{data.name}</CardTitle>
      <CardContent>{data.status}</CardContent>
      <CardContent>{data.gender}</CardContent>
      <CardContent>{data.species}</CardContent>
      <CardContent>{data.type ? data.type : 'No data'}</CardContent>
    </CardHeader>
  </Card>
  )
}

export default CharacterCard
