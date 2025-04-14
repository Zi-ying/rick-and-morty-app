import { Badge } from '@/components/ui/badge';
import { allFilters } from '@/store/filters-slice';
import { useAppSelector } from '@/store/redux-hooks';

const FilterBadges = () => {
  const filters = useAppSelector(allFilters);

  return (
    <div className="flex flex-wrap gap-2">
      {filters.name && (
        <Badge className='capitalize'>Name: {filters.name}</Badge>
      )}
      {filters.gender && (
        <Badge className='capitalize'>Gender: {filters.gender}</Badge>
      )}
      {filters.status && (
        <Badge className='capitalize'>Status: {filters.status}</Badge>
      )}
      {filters.species && (
        <Badge className='capitalize'>Species: {filters.species}</Badge>
      )}
      {filters.type && (
        <Badge className='capitalize'>Type: {filters.type}</Badge>
      )}
    </div>
  );
};

export default FilterBadges;
