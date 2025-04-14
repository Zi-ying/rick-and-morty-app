import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { allFilters, removeOneFilter } from '@/store/filters-slice';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';

interface FilterBadgesProps {
  className: string;
  onResetClick: () => void;
}

const FilterBadges = ({ className, onResetClick }: FilterBadgesProps) => {
  const filters = useAppSelector(allFilters);
  const dispatch = useAppDispatch();

  return (
    <div className={className}>
      {filters.name && (
        <Badge className="capitalize">
          Name: {filters.name}
          <button onClick={() => dispatch(removeOneFilter("name"))}>X</button>
        </Badge>
      )}
      {filters.gender && (
        <Badge className="capitalize">
          Gender: {filters.gender}
          <button onClick={() => dispatch(removeOneFilter("gender"))}>X</button>
        </Badge>
      )}
      {filters.status && (
        <Badge className="capitalize">
          Status: {filters.status}
          <button onClick={() => dispatch(removeOneFilter("status"))}>X</button>
        </Badge>
      )}
      {filters.species && (
        <Badge className="capitalize">
          Species: {filters.species}
          <button onClick={() => dispatch(removeOneFilter("species"))}>
            X
          </button>
        </Badge>
      )}
      {filters.type && (
        <Badge className="capitalize">
          Type: {filters.type}
          <button onClick={() => dispatch(removeOneFilter("type"))}>X</button>
        </Badge>
      )}
      {(filters.name || filters.gender || filters.species || filters.status || filters.type) && (
        <Button variant="ghost" onClick={onResetClick}>
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterBadges;
