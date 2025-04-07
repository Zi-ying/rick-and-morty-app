import { Badge } from '../../components/ui/badge';
import { filtersList } from '../../store/filters-slice';
import { useAppSelector } from '../../store/redux-hooks';

const FilterBadges = () => {
  const filters = useAppSelector(filtersList);

  return (
    <div className="flex flex-wrap gap-2">
      {filters.name && (
        <Badge>Name: {filters.name}</Badge>
      )}
      {filters.gender && (
        <Badge>Gender: {filters.gender}</Badge>
      )}
      {filters.status && (
        <Badge>Status: {filters.status}</Badge>
      )}
      {filters.species && (
        <Badge>Species: {filters.species}</Badge>
      )}
      {filters.type && (
        <Badge>Type: {filters.type}</Badge>
      )}
    </div>
  );
};

export default FilterBadges;
