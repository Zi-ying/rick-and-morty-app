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
  onClick?: () => void;
  onToggle?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SmallCharacterCard = ({
  data,
  isPending,
  isFavorite,
  hasToggle,
  onClick,
  onToggle,
}: SmallCharacterCardProps) => {
  if (isPending) {
    return (
      <Card>
        <Spinner />
      </Card>
    );
  }

  return (
    <Card
      className="p-4 rounded-xl grid grid-cols-3 items-center shadow-brand-md hover:shadow-pickle-500/50 backdrop-blur-md"
      onClick={onClick}
    >
      <Image
        src={data.image}
        alt={`image of ${data.name} from Rick and Morty`}
        className="rounded-full"
      />
      <CardHeader className="col-span-2 text-pickle-500 grid grid-cols-2">
        <CardTitle className="self-center">{data.name}</CardTitle>
        {hasToggle && (
          <div className="justify-self-end self-center">
            <HeartToggle isToggled={isFavorite} onToggle={onToggle} />
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default SmallCharacterCard;
