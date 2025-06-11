import HeartToggle from '@/components/heartToggle';
import Image from '@/components/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';

import type { Character } from "../characters/types";

interface SmallCharacterCardProps {
  data: Character;
  isPending: boolean;
  isFavorite?: boolean;
  hasToggle?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onToggle?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SmallCharacterCard = ({
  data,
  isPending,
  isFavorite = false,
  hasToggle = false,
  onClick,
  onToggle,
}: SmallCharacterCardProps) => {
  if (isPending) {
    return (
      <Card role="status" aria-label="Loading character card">
        <Spinner />
      </Card>
    );
  }

  return (
    <Card
      role="article"
      aria-label={`Character card for ${data.name}`}
      data-testid="character-card"
      className="p-4 rounded-xl grid grid-cols-3 items-center shadow-brand-md hover:shadow-pickle-500/50 backdrop-blur-md"
      onClick={onClick}
    >
      <Image
        src={data.image}
        alt={`${data.name} from Rick and Morty`}
        className="rounded-full"
        width={80}
        height={80}
      />
      <CardHeader className="col-span-2 text-pickle-500 grid grid-cols-2">
        <CardTitle className="self-center">{data.name}</CardTitle>
        {hasToggle && (
          <div
            className="justify-self-end self-center"
            role="button"
            aria-label={`${isFavorite ? 'Remove' : 'Add'} ${data.name} to favorites`}
            onClick={onToggle}
          >
            <HeartToggle isToggled={isFavorite} onToggle={onToggle} />
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default SmallCharacterCard;
