import Image from '@/components/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/spinner';

import type { Character } from '../characters/types';

interface SmallCharacterCardProps {
  data: Character;
  isPending: boolean;
}

const SmallCharacterCard = ({ data, isPending }: SmallCharacterCardProps) => {

  if (isPending) {
    return <Card><LoadingSpinner /></Card>
  }

  return (
    <Card className="p-4 rounded-xl grid grid-cols-3 items-center hover:shadow-xl shadow-pickle-500/50 backdrop-blur-sm">
      <Image
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
        className="rounded-full"
      />
      <CardHeader onLoad={() => <LoadingSpinner/>} className="col-span-2 text-pickle-500">
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SmallCharacterCard;
