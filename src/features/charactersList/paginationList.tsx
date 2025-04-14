import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationListProps {
  page: number;
  maxPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PaginationList = ({
  page,
  maxPage,
  onPreviousPage,
  onNextPage,
}: PaginationListProps) => {
  const isFirstPage = page === 1;
  const isLastPage = page === maxPage

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPreviousPage} disabled={isFirstPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={onNextPage} disabled={isLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
