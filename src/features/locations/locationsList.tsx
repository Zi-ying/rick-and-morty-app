import { Link } from 'react-router-dom';

import DataNotFound from '../dataNotFound';
import { getPagination } from '../pagination/get-pagination';
import PaginationList from '../pagination/paginationList';
import LocationCard from './locationCard';

import type { Location, PaginationParams } from "@/types/types";
interface LocationsListProps {
  data?: { results: Location[]; info: PaginationParams };
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const LocationsList = ({ data, currentPage, setPage }: LocationsListProps) => {
  if (!data?.info && !data?.results) {
    return <DataNotFound />;
  }

  const maxPage = data.info.pages;

  const {
    page,
    isFirstPage,
    isLastPage,
    setFirstPage,
    setLastPage,
    setNextPage,
    setPreviousPage,
  } = getPagination(currentPage, maxPage, setPage);

  return (
    <div className="bg-red-300 grid md:grid-cols-2 gap-2">
      {data.results.map((item) => {
        return (
          <Link key={item.id} to={item.id.toString()}>
            <LocationCard data={item} />
          </Link>
        );
      })}
      <PaginationList
        page={page}
        maxPage={maxPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        setPage={setPage}
        onFirstPage={setFirstPage}
        onLastPage={setLastPage}
        onPreviousPage={setPreviousPage}
        onNextPage={setNextPage}
      />
    </div>
  );
};

export default LocationsList;
