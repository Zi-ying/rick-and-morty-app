import Spinner from '../../components/ui/spinner';
import CharactersList from './charactersList';
import PaginationList from './paginationList';

import type { Character, PaginationParams } from '../../types/types';
interface CharactersListDisplayProps {
  data: {
    results: Character[];
    info: PaginationParams;
  } | undefined;
  isPending: boolean;
  error: Error | null;
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const CharactersListDisplay = ({
  data,
  isPending,
  error,
  currentPage,
  onPreviousPage,
  onNextPage,
}: CharactersListDisplayProps) => {
  if (error) return <div>An error has occurred: {error.message}</div>;

  if (isPending) {
    return (
      <div className="min-h-96 w-full grid justify-center items-center border rounded-2xl shadow-2xl">
        <Spinner />
      </div>
    );
  }

  if (!data?.results) {
    return (
      <div className="min-h-96 flex flex-col items-center justify-center gap-4">
        <p className="lg:text-3xl text-slate-700">Oops</p>
        <h1 className="lg:text-xl text-slate-500">No data found.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="w-full hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-6 p-6">
        <CharactersList data={data.results} />
      </div>
      <div className="w-full grid sm:grid-cols-2 gap-2 md:hidden p-4">
        <CharactersList data={data.results} isSmallScreen />
      </div>
      <div className="flex gap-1 md:gap-4 justify-center p-4">
        <PaginationList
          page={currentPage}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      </div>
    </>
  );
};

export default CharactersListDisplay;
