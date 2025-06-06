import { Link, useParams } from 'react-router-dom';

import Spinner from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';

import BackButton from '../backButton';
import Character from '../character/character';
import { getLocationById } from '../locations/get-location-by-id';
import LocationCard from '../locations/locationCard';
import Navigation from '../navigation/navigation';
import ResultNotFound from '../resultNotFound';

import type { Location } from "../locations/types";

const Location = () => {
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
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return <ResultNotFound />;
  }

  if (!isStatus200(data)) {
    return <>{data.error}</>;
  }

  return (
    <>
      <Navigation />
      <div className="p-2 space-y-2 overflow-y-auto">
        <LocationCard data={data} />
        <div className="text-pickle-400 px-6">Residents:</div>
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
      <BackButton className="mx-auto my-2" />
    </>
  );
};

export default Location;
