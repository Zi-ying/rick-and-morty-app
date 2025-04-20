import LocationsList from '@/features/locations/locationsList';
import Navigation from '@/features/navigation';

const LocationPage = () => {
  return (
    <>
      <Navigation />
      <div className="bg-red-400 grid p-2 gap-2">
        <div>LOCATIONS</div>
        <div className='bg-red-300 grid md:grid-cols-2 gap-2'>
          <LocationsList />
        </div>
      </div>
    </>
  );
};

export default LocationPage;
