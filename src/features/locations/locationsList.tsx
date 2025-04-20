
import LocationCard from './locationCard';

import type { Location } from "@/types/types";

interface LocationsListProps {
  data: Location[];
}

const LocationsList = ({ data }: LocationsListProps) => {
  return (
    <>
      {data.map((item) => {
        return <LocationCard key={item.id} data={item} />;
      })}
    </>
  );
};

export default LocationsList;
