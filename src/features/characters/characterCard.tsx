import { Circle } from 'lucide-react';

import HeartToggle from '@/components/heartToggle';
import Image from '@/components/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { Character } from '@/types/types';

interface CharacterCardProps {
  data: Character;
  isPending: boolean;
  isFavorite: boolean;
  onClick: () => void;
  onToggle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CharacterCard = ({
  data,
  isPending,
  isFavorite,
  onToggle,
  onClick,
}: CharacterCardProps) => {

  if (isPending) {
    return (
      <Card>
        <Spinner />
      </Card>
    );
  }

  return (
    <Card className="rounded-xl hover:shadow-xl shadow-pickle-500/50 backdrop-blur-xs" onClick={onClick}>
      <Image
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
        className="rounded-t-xl"
      />
      <CardHeader className="grid grid-cols-5 p-4 items-center">
        <CardTitle className="flex items-center justify-center gap-1 col-start-2 col-span-3">
          <span className="text-align text-pickle-500">{data.name}</span>
          <Circle
            className={cn(
              "h-2.5 stroke-2.5",
              data.status === "Alive" && "stroke-green-400 fill-green-400",
              data.status === "unknown" && "stroke-green-400",
              data.status === "Dead" && "stroke-slate-700 fill-slate-700"
            )}
          />
        </CardTitle>
        <div className="justify-self-end z-10">
          <HeartToggle isToggled={isFavorite} onToggle={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onToggle(e)} />
        </div>
      </CardHeader>
    </Card>
  );
};

export default CharacterCard;
