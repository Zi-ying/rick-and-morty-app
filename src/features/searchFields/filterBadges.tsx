import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { CharacaterFilterParams } from '../../types/types';

interface FilterBadgesProps {
  filters: CharacaterFilterParams;
  className: string;
  onClearOne: (filter: keyof CharacaterFilterParams) => void;
  onClearAll: () => void;
}

const FilterBadges = ({ filters, className, onClearAll, onClearOne }: FilterBadgesProps) => {
  return (
    <div className={className}>
      {filters.name && (
        <Badge className="capitalize">
          Name: {filters.name}
          <span onClick={() => onClearOne('name')} className='cursor-pointer'>X</span>
        </Badge>
      )}
      {filters.gender && (
        <Badge className="capitalize">
          Gender: {filters.gender}
          <span onClick={() => onClearOne('gender')} className='cursor-pointer'>X</span>
        </Badge>
      )}
      {filters.status && (
        <Badge className="capitalize">
          Status: {filters.status}
          <span onClick={() => onClearOne('status')} className='cursor-pointer'>X</span>
        </Badge>
      )}
      {filters.species && (
        <Badge className="capitalize">
          Species: {filters.species}
          <div
            onClick={() => onClearOne('species')}
            className="cursor-pointer"
          >
            X
          </div>
        </Badge>
      )}
      {filters.type && (
        <Badge className="capitalize">
          Type: {filters.type}
          <span
            onClick={() => onClearOne("type")}
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
        filters.type) && (
        <Button variant="ghost" onClick={onClearAll}>
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterBadges;
