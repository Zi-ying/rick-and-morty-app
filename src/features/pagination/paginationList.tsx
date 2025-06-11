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

const PaginationList = ({
  currentPage,
  maxPage,
  className,
  setCurrentPage
}: PaginationListProps) => {
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

  const getPageItemClassName = (condition: boolean) =>
    cn('backdrop-blur-sm', condition ? "hidden" : "hidden sm:inline-flex");

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
        <PaginationItem className={getPageItemClassName(isFirstPages)}>
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
        <PaginationItem className={getPageItemClassName(currentPage <= 2)}>
          <PaginationLink onClick={setPreviousPage}>{currentPage - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem className={getPageItemClassName(currentPage >= maxPage - 1)}>
          <PaginationLink onClick={setNextPage}>{currentPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem className={getPageItemClassName(isLastPages)}>
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn('backdrop-blur-sm', isLastPage ? "hidden" : "inline-flex")}>
          <PaginationLink onClick={setLastPage}>{maxPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem className='backdrop-blur-sm'>
          <PaginationNext onClick={setNextPage} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
