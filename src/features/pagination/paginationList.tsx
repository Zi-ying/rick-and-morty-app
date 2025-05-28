import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

import { getPagination } from './get-pagination';

interface PaginationListProps {
  currentPage: number;
  maxPage: number;
  className?: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationList = ({ currentPage, maxPage, className, setCurrentPage }: PaginationListProps) => {

  const {
    page,
    isFirstPage,
    isLastPage,
    isFirstPages,
    isLastPages,
    setFirstPage,
    setLastPage,
    setNextPage,
    setPreviousPage,
  } = getPagination(currentPage, maxPage, setCurrentPage);

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem className='backdrop-blur-sm'>
          <PaginationPrevious
            onClick={setPreviousPage}
            disabled={isFirstPage}
          />
        </PaginationItem>
        <PaginationItem className={cn(isFirstPage ? "hidden" : "inline-flex")}>
          <PaginationLink onClick={setFirstPage}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn('backdrop-blur-sm', isFirstPages  ? "hidden" : "hidden sm:inline-flex")}>
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn('backdrop-blur-sm', currentPage <= 2 ? "hidden" : "hidden sm:inline-flex")}>
          <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn('backdrop-blur-sm', currentPage >= maxPage - 1 ? "hidden" : "hidden sm:inline-flex")}>
          <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn('blackdrop-blur-sm', isLastPages ? "hidden" : "hidden sm:inline-flex")}>
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn('backdrop-blur-sm', isLastPage ? "hidden" : "inline-flex")}>
          <PaginationLink onClick={setLastPage}>{maxPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem  className='backdrop-blur-sm'>
          <PaginationNext onClick={setNextPage} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
