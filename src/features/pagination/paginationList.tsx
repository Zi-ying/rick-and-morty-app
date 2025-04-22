import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface PaginationListProps {
  page: number;
  maxPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const PaginationList = ({ page, maxPage, onPreviousPage, onNextPage, onFirstPage, onLastPage, isFirstPage, isLastPage }: PaginationListProps) => {

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onPreviousPage}
            disabled={isFirstPage}
          />
        </PaginationItem>
        <PaginationItem className={cn(isFirstPage ? "hidden" : "inline-flex")}>
          <PaginationLink onClick={onFirstPage}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isFirstPage ? "hidden" : "inline-flex")}>
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isLastPage ? "hidden" : "inline-flex")}>
          <PaginationLink disabled>...</PaginationLink>
        </PaginationItem>
        <PaginationItem className={cn(isLastPage ? "hidden" : "inline-flex")}>
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
