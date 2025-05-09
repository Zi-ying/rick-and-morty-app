import { Link, useParams } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import Character from '@/features/character/character';
import { getLocationById } from '@/features/location/get-location-by-id';
import LocationCard from '@/features/locations/locationCard';
import ResultsNotFound from '@/features/resultsNotFound';
import { useQuery } from '@tanstack/react-query';

import type { Location } from "@/types/types";
const LocationPage = () => {
  const { locationId } = useParams();

  const isStatus200 = (
    location: Location | { error: string }
  ): location is Location => {
    return (location as Location).id !== undefined;
  };

  const { data, isPending } = useQuery({
    queryKey: ["locationData", locationId],
    queryFn: async () => getLocationById(locationId),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (!data) {
    return <ResultsNotFound />;
  }

  if (!isStatus200(data)) {
    return <>{data.error}</>;
  }

  return (
    <div className="p-2 space-y-2">
      <LocationCard data={data} />
      <div className="text-pickle-400">Residents:</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
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
