import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { Filters } from "@/types/filters";
interface FilterBadgesProps {
  filters: Filters;
  className?: string;
  onClearOne: (filter: keyof Filters) => void;
  onClearAll: () => void;
}

const FilterBadges = ({
  filters,
  className,
  onClearAll,
  onClearOne,
}: FilterBadgesProps) => {
  return (
    <div className={cn('py-2 space-x-2 space-y-2', className)}>
      {filters.characterName && (
        <Badge className="capitalize">
          Name: <p className="font-medium">{filters.characterName}</p>
          <p
            onClick={() => onClearOne("characterName")}
            className="cursor-pointer"
          >
            X
          </p>
        </Badge>
      )}
      {filters.locationName && (
        <Badge className="capitalize">
          Name: <p className="font-medium">{filters.locationName}</p>
          <p
            onClick={() => onClearOne("locationName")}
            className="cursor-pointer"
          >
            X
          </p>
        </Badge>
      )}
      {filters.episodeName && (
        <Badge className="capitalize">
          Name: <p className="font-medium">{filters.episodeName}</p>
          <p
            onClick={() => onClearOne("episodeName")}
            className="cursor-pointer"
          >
            X
          </p>
        </Badge>
      )}
      {filters.gender && (
        <Badge className="capitalize">
          Gender: <p className="font-medium">{filters.gender}</p>
          <p onClick={() => onClearOne("gender")} className="cursor-pointer">
            X
          </p>
        </Badge>
      )}
      {filters.status && (
        <Badge className="capitalize">
          Status: <p className="font-medium">{filters.status}</p>
          <p onClick={() => onClearOne("status")} className="cursor-pointer">
            X
          </p>
        </Badge>
      )}
      {filters.species && (
        <Badge className="capitalize">
          Species: <p className="font-medium">{filters.species}</p>
          <div onClick={() => onClearOne("species")} className="cursor-pointer">
            X
          </div>
        </Badge>
      )}
      {filters.characterType && (
        <Badge className="capitalize">
          Type: <p className="font-medium">{filters.characterType}</p>
          <p
            onClick={() => onClearOne("characterType")}
            className="cursor-pointer"
          >
            X
          </p>
        </Badge>
      )}
      {filters.locationType && (
        <Badge className="capitalize">
          Type: <p className="font-medium">{filters.locationType}</p>
          <p
            onClick={() => onClearOne("locationType")}
            className="cursor-pointer"
          >
            X
          </p>
        </Badge>
      )}
      {filters.dimension && (
        <Badge className="capitalize">
          Type: <p className="font-medium">{filters.dimension}</p>
          <p
            onClick={() => onClearOne("dimension")}
            className="cursor-pointer"
          >
            X
          </p>
        </Badge>
      )}
      {filters.episode && (
        <Badge className="capitalize">
          Episode: <p className="font-medium">{filters.episode}</p>
          <p
            onClick={() => onClearOne("episode")}
            className="cursor-pointer"
          >
            X
          </p>
        </Badge>
      )}
      {(filters.characterName ||
        filters.characterType ||
        filters.gender ||
        filters.species ||
        filters.status ||
        filters.dimension ||
        filters.episode ||
        filters.episodeName ||
        filters.locationName ||
        filters.locationType) && (
        <Button variant="outline" size="sm" onClick={onClearAll}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default FilterBadges;
