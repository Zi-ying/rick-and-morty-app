import { Link } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';

import LocationCard from './locationCard';

import type { Location } from "@/types/types";
interface LocationsListProps {
  data: Location[];
  isPending: boolean;
}

const LocationsList = ({ data, isPending }: LocationsListProps) => {
  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="bg-red-300 grid md:grid-cols-2 gap-2">
      {data.map((item) => {
        return (
          <Link key={item.id} to={item.id.toString()}>
            <LocationCard data={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default LocationsList;
