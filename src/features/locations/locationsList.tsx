
import DataNotFound from '../dataNotFound';
import PaginationList from '../pagination/paginationList';
import LocationCard from './locationCard';

import type { Location, PaginationParams } from "@/types/types";

interface LocationsListProps {
  data?: { results: Location[], info: PaginationParams };
  page: number;
  onPage: React.Dispatch<React.SetStateAction<number>>;
}

const LocationsList = ({ data, page, onPage }: LocationsListProps) => {

  if (!data?.info && !data?.results) {
    return <DataNotFound />;
  }

  return (
    <div className="bg-red-300 grid md:grid-cols-2 gap-2">
      {data.results.map((item) => {
        return <LocationCard key={item.id} data={item} />;
      })}
       <PaginationList
          page={page}
          maxPage={data?.info.pages}
          setPage={onPage}
        />
    </div>
  );
};

export default LocationsList;
