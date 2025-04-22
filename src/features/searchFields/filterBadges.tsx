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
          Name: {filters.characterName}
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
          Name: {filters.locationName}
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
          Name: {filters.episodeName}
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
          Gender: {filters.gender}
          <span onClick={() => onClearOne("gender")} className="cursor-pointer">
            X
          </span>
        </Badge>
      )}
      {filters.status && (
        <Badge className="capitalize">
          Status: {filters.status}
          <span onClick={() => onClearOne("status")} className="cursor-pointer">
            X
          </span>
        </Badge>
      )}
      {filters.species && (
        <Badge className="capitalize">
          Species: {filters.species}
          <div onClick={() => onClearOne("species")} className="cursor-pointer">
            X
          </div>
        </Badge>
      )}
      {filters.characterType && (
        <Badge className="capitalize">
          Type: {filters.characterType}
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
          Type: {filters.locationType}
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
          Type: {filters.dimension}
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
          Type: {filters.episode}
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
        <Button variant="ghost" onClick={onClearAll}>
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterBadges;
