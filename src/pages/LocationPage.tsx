import { Link, useParams } from 'react-router-dom';

import Character from '@/features/character/character';
import DataNotFound from '@/features/dataNotFound';
import { getLocationById } from '@/features/location/get-location-by-id';
import { useQuery } from '@tanstack/react-query';

import type { Location } from "@/types/types";
const LocationPage = () => {
  const { locationId } = useParams();

  function isStatus200(
    location: Location | { error: string }
  ): location is Location {
    return (location as Location).id !== undefined;
  }

  const { data } = useQuery({
    queryKey: ["locationData", locationId],
    queryFn: async () => getLocationById(locationId),
  });

  if (!data) {
    return <DataNotFound />;
  }

  if (!isStatus200(data)) {
    return <>{data.error}</>;
  }

  return (
    <div className="bg-pink-600">
      <div className="bg-pink-500">
        <div>name: {data.name}</div>
        <div>dimension: {data.dimension}</div>
      </div>
      <div> residents:</div>
      <div className="grid grid-cols-5">
        {data.residents.map((resident) => {
          const url = new URL(resident);
          const characterId = url.pathname.slice(
            url.pathname.lastIndexOf("/"),
            url.pathname.length
          );

          return (
            <Link key={characterId} to={`/character${characterId}`}>
              <Character id={characterId} isSmallCard />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LocationPage;
