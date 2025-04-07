import { useState } from 'react';

  export const usePagination = (currentPage: number, pageCount: number) => {
    const [page, setPage] = useState<number>(currentPage);

    const setNextPage = () => {
      setPage(Math.min(page + 1, pageCount));
    };

    const setPreviousPage = () => {
      setPage(Math.max(page - 1, 1));
    };

    return {
      page,
      setNextPage,
      setPreviousPage,
    };
  };
