import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { FilterParams } from "@/types/types";

interface FilterBadgesProps {
  filters: FilterParams;
  className: string;
  onClearOne: (filter: keyof FilterParams) => void;
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
      {filters.name && (
        <Badge className="capitalize">
          Name: {filters.name}
          <span onClick={() => onClearOne("name")} className="cursor-pointer">
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
      {filters.type && (
        <Badge className="capitalize">
          Type: {filters.type}
          <span onClick={() => onClearOne("type")} className="cursor-pointer">
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
      {(filters.name ||
        filters.gender ||
        filters.species ||
        filters.status ||
        filters.dimension ||
        filters.episode ||
        filters.type) && (
        <Button variant="ghost" onClick={onClearAll}>
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterBadges;
