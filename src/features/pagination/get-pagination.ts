export const getPagination = (
  page: number,
  maxPage: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const isFirstPage = page === 1;
  const isSecondPage = page === 2;
  const isFirstPages = isFirstPage || isSecondPage;
  const isLastPage = page === maxPage;
  const isSecondLastPage = page === maxPage - 1;
  const isLastPages = isLastPage || isSecondLastPage;

  const setFirstPage = () => {
    setPage(1);
  };

  const setLastPage = () => {
    setPage(maxPage);
  };

  const setNextPage = () => {
    setPage(Math.min(page + 1, maxPage));
  };

  const setPreviousPage = () => {
    setPage(Math.max(page - 1, 1));
  };

  return {
    page,
    maxPage,
    isFirstPage,
    isLastPage,
    isFirstPages,
    isLastPages,
    setFirstPage,
    setLastPage,
    setNextPage,
    setPreviousPage,
  };
};
