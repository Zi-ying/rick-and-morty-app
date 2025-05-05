
import HeartToggle from '@/components/heart-toggle';
import Image from '@/components/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Character } from '@/types/types';

interface CharacterCardProps {
  data: Character;
  isFavorite: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CharacterCard = ({ data, isFavorite, onClick }: CharacterCardProps) => {

  return (
    <Card className="rounded-xl hover:shadow-xl shadow-pickle-500/50 backdrop-blur-xs">
      <Image
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
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
       <HeartToggle isToggled={isFavorite} onToggle={() => onClick}/>
      </CardHeader>
    </Card>
  );
};

export default CharacterCard;
