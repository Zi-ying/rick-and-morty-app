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
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PaginationList = ({
  page,
  onPreviousPage,
  onNextPage,
}: PaginationListProps) => {
  const isFirstPage = page === 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={onPreviousPage}
            disabled={isFirstPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={onNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationList;
