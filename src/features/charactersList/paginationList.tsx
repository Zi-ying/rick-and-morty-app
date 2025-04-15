import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { cn } from '../../lib/utils';

interface PaginationListProps {
  page: number;
  maxPage: number;
  onFirstPage: () => void;
  onLastPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PaginationList = ({
  page,
  maxPage,
  onFirstPage,
  onLastPage,
  onPreviousPage,
  onNextPage,
}: PaginationListProps) => {
  const isFirstPage = page === 1;
  const isLastPage = page === maxPage

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' onClick={onPreviousPage} disabled={isFirstPage} />
        </PaginationItem>
        <PaginationItem className={cn(isFirstPage ? 'hidden' : 'inline-flex')}>
          <PaginationLink href='#' onClick={onFirstPage}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isFirstPage ? 'hidden' : 'inline-flex')}>
          <PaginationLink href='#'>...</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#' isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isLastPage ? 'hidden' : 'inline-flex')}>
          <PaginationLink href='#'>...</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isLastPage ? 'hidden' : 'inline-flex')}>
          <PaginationLink href='#' onClick={onLastPage}>{maxPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' onClick={onNextPage} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
