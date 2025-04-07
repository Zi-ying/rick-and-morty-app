import Image from '../../components/image';
import { Card, CardHeader, CardTitle } from '../../components/ui/card';
import { Character } from '../../types/types';

interface SmallCharacterCardProps {
  data: Character;
}

const SmallCharacterCard = ({ data }: SmallCharacterCardProps) => {

  return (
    <Card className="p-4 rounded-xl shadow-lg grid grid-cols-3  min-w-[150px] items-center">
      <Image
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
      />

      <CardHeader className="col-span-2">
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SmallCharacterCard;
