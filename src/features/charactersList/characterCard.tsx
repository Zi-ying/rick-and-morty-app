import Image from '../../components/image';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { Character } from '../../types/types';

interface CharacterCardProps {
  data: Character;
}

const CharacterCard = ({ data }: CharacterCardProps) => {
  return (
    <Card className="p-4 gap-6 rounded-lg shadow-xl bg-transparent hover:bg-brand-500 text-white hover:text-pickle-500 ">
        <Image
          src={data.image}
          alt={`image of ${data.name} from Rick and Morty`}
          className="rounded-full shadow-2xl"
        />
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardContent className="flex gap-2 items-center justify-center">
          <div
            className={cn(
              "rounded-full w-2 h-2",
              data.status === "Alive" && "bg-green-400",
              data.status === "unknown" && "bg-slate-500",
              data.status === "Dead" && "bg-red-500"
            )}
          />
          <p>{data.status}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CharacterCard;
