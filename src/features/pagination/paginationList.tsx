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
  page: number;
  maxPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationList = ({ page, maxPage, setPage }: PaginationListProps) => {
  const { setFirstPage, setLastPage, setNextPage, setPreviousPage } =
    getPagination(page, maxPage, setPage);

  const isFirstPage = page === 1;
  const isLastPage = page === maxPage;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={setPreviousPage}
            disabled={isFirstPage}
          />
        </PaginationItem>
        <PaginationItem className={cn(isFirstPage ? "hidden" : "inline-flex")}>
          <PaginationLink onClick={setFirstPage}>1</PaginationLink>
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
          <PaginationLink onClick={setLastPage}>{maxPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={setNextPage} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
