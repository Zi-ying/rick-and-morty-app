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
    <Pagination >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPreviousPage} disabled={isFirstPage} />
        </PaginationItem>
        <PaginationItem className={cn(isFirstPage ? 'hidden' : 'inline-flex')}>
          <PaginationLink onClick={onFirstPage}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isFirstPage ? 'hidden' : 'inline-flex')}>
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isLastPage ? 'hidden' : 'inline-flex')}>
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isLastPage ? 'hidden' : 'inline-flex')}>
          <PaginationLink onClick={onLastPage}>{maxPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={onNextPage} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
