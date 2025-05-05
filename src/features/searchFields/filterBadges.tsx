import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { Filters } from "@/types/types";

interface FilterBadgesProps {
  filters: Filters;
  className: string;
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
    <div className={className}>
      {filters.characterName && (
        <Badge className="capitalize">
          Name: <span className="font-medium">{filters.characterName}</span>
          <span
            onClick={() => onClearOne("characterName")}
            className="cursor-pointer"
          >
            X
          </span>
        </Badge>
      )}
      {filters.locationName && (
        <Badge className="capitalize">
          Name: <span className="font-medium">{filters.locationName}</span>
          <span
            onClick={() => onClearOne("locationName")}
            className="cursor-pointer"
          >
            X
          </span>
        </Badge>
      )}
      {filters.episodeName && (
        <Badge className="capitalize">
          Name: <span className="font-medium">{filters.episodeName}</span>
          <span
            onClick={() => onClearOne("episodeName")}
            className="cursor-pointer"
          >
            X
          </span>
        </Badge>
      )}
      {filters.gender && (
        <Badge className="capitalize">
          Gender: <span className="font-medium">{filters.gender}</span>
          <span onClick={() => onClearOne("gender")} className="cursor-pointer">
            X
          </span>
        </Badge>
      )}
      {filters.status && (
        <Badge className="capitalize">
          Status: <span className="font-medium">{filters.status}</span>
          <span onClick={() => onClearOne("status")} className="cursor-pointer">
            X
          </span>
        </Badge>
      )}
      {filters.species && (
        <Badge className="capitalize">
          Species: <span className="font-medium">{filters.species}</span>
          <div onClick={() => onClearOne("species")} className="cursor-pointer">
            X
          </div>
        </Badge>
      )}
      {filters.characterType && (
        <Badge className="capitalize">
          Type: <span className="font-medium">{filters.characterType}</span>
          <span
            onClick={() => onClearOne("characterType")}
            className="cursor-pointer"
          >
            X
          </span>
        </Badge>
      )}
      {filters.locationType && (
        <Badge className="capitalize">
          Type: <span className="font-medium">{filters.locationType}</span>
          <span
            onClick={() => onClearOne("locationType")}
            className="cursor-pointer"
          >
            X
          </span>
        </Badge>
      )}
      {filters.dimension && (
        <Badge className="capitalize">
          Type: <span className="font-medium">{filters.dimension}</span>
          <span
            onClick={() => onClearOne("dimension")}
            className="cursor-pointer"
          >
            X
          </span>
        </Badge>
      )}
      {filters.episode && (
        <Badge className="capitalize">
          Episode: <span className="font-medium">{filters.episode}</span>
          <span
            onClick={() => onClearOne("episode")}
            className="cursor-pointer"
          >
            X
          </span>
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
