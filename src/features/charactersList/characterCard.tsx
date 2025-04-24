import { Heart } from 'lucide-react';

import Image from '@/components/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Character } from '@/types/types';

interface CharacterCardProps {
  data: Character;
  isPending: boolean;
  isFav: boolean;
}

const CharacterCard = ({ data, isPending, isFav }: CharacterCardProps) => {
  return (
    <Card className="rounded-xl hover:shadow-xl hover:text-pickle-500 shadow-pickle-500/50 backdrop-blur-xs">
      <Image
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
        isPending={isPending}
        className="rounded-t-xl"
      />
      <CardHeader className="flex p-4 items-center w-full">
        <CardTitle className="text-pickle-500 grow flex items-center justify-center gap-2">
          {data.name}
          <div
            className={cn(
              "rounded-full w-2 h-2",
              data.status === "Alive" && "bg-green-400",
              data.status === "unknown" && "bg-slate-500",
              data.status === "Dead" && "bg-red-500"
            )}
          />
        </CardTitle>
        <Heart
          className={cn("stroke-pink-700", isFav && "fill-pink-700")}
          onClick={() => localStorage.setItem(data.id.toString(), data.name)}
        />
      </CardHeader>
    </Card>
  );
};

export default CharacterCard;
