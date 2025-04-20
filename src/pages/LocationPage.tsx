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

  if (!data?.results) {
    return <>No Data found</>
  }

  return (
    <>
      <Navigation />
      <div className="bg-red-400 grid p-2 gap-2">
        <div>LOCATIONS</div>
        <div className="bg-red-300 grid md:grid-cols-2 gap-2">
          <LocationsList data={data.results} />
        </div>
      </div>
    </>
  );
};

export default LocationPage;
