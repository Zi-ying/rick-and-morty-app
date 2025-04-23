import { Link } from 'react-router-dom';

import SmallCharacterCard from '@/features/character/smallCharacterCard';
import PaginationList from '@/features/pagination/paginationList';

import DataNotFound from '../dataNotFound';
import { getPagination } from '../pagination/get-pagination';
import CharacterCard from './characterCard';

import type { Character, PaginationParams } from "@/types/types";
interface CharactersListProps {
  data:
    | {
        results: Character[];
        info: PaginationParams;
      }
    | undefined;
  isPending: boolean;
  error: Error | null;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CharactersList = ({
  data,
  isPending,
  error,
  currentPage,
  setPage,
}: CharactersListProps) => {
  if (error) return <div>An error has occurred: {error.message}</div>;

  if (!data?.results && !data?.info) {
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
    <>
      <div className='sticky top-52'>
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
      <div className="hidden sm:inline-grid sm:text-2xl sm:text-pickle-500">
        Character's list from Rick and Morty
      </div>
      <div className="w-full hidden md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-6 p-6">
        {data.results.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.id.toString()}
              className="grid justify-center cursor-pointer"
            >
              <CharacterCard data={item} isPending={isPending} />
            </Link>
          );
        })}
      </div>
      <div className="w-full grid sm:grid-cols-2 gap-2 md:hidden p-4">
        {data.results.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.id.toString()}
              className="grid justify-center cursor-pointer"
            >
              <SmallCharacterCard data={item} isPending={isPending} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CharactersList;
