import HeartToggle from '@/components/heartToggle';
import Image from '@/components/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';

import StatusCircle from './status-circle';

import type { Character } from "./types";
interface CharacterCardProps {
  data: Character;
  isPending: boolean;
  isFavorite: boolean;
  onClick: () => void;
  onToggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CharacterCard = (({
  data,
  isPending,
  isFavorite,
  onToggle,
  onClick,
}: CharacterCardProps) => {
  if (isPending) {
    return (
      <Card role="status" aria-label="Loading character card">
        <Spinner />
      </Card>
    );
  }

  return (
    <Card
      className="rounded-xl shadow-brand-xl hover:shadow-pickle-500/50 backdrop-blur-md"
      onClick={onClick}
    >
      <Image
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
        className="rounded-t-xl"
        loading="lazy"
      />
      <CardHeader className="grid grid-cols-5 p-4 items-center h-full">
        <CardTitle className="flex items-center justify-center gap-1 col-start-2 col-span-3">
          <p className="text-align text-pickle-500">{data.name}</p>
          <StatusCircle status={data.status} />
        </CardTitle>
        <div className="justify-self-end flex">
          <HeartToggle
            isToggled={isFavorite}
            onToggle={onToggle}
            aria-label={`Remore or add ${data.name} to favorites`}
          />
        </div>
      </CardHeader>
    </Card>
  );
});


export default CharacterCard;
