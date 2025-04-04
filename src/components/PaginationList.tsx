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
  onPreviousPage: () => void
  onNextPage: () => void
}

const PaginationList = ({page, onPreviousPage, onNextPage}: PaginationListProps) => {
  return (
    <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" onClick={onPreviousPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">{page}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#" onClick={onNextPage} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}

export default PaginationList
