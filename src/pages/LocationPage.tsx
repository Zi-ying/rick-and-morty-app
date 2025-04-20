import { getAllLocations } from '@/features/locations/get-all-locations';
import LocationsList from '@/features/locations/locationsList';
import Navigation from '@/features/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const LocationPage = () => {
  const { data } = useQuery({
    queryKey: ["locationsData"],
    queryFn: getAllLocations,
    placeholderData: keepPreviousData,
  });

  console.log('data', data?.results)

  return (
    <>
      <Navigation />
      <div className="bg-red-400 grid p-2 gap-2">
        <div>LOCATIONS</div>
        <div className="bg-red-300 grid md:grid-cols-2 gap-2">
          <LocationsList />
        </div>
      </div>
    </>
  );
};

export default LocationPage;
