export const getPagination = (
  page: number,
  maxPage: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {

  const isFirstPage = page === 1;
  const isLastPage = page === maxPage;

  const setFirstPage =  () => {
    setPage(1);
  }

  const setLastPage = () => {
    setPage(maxPage);
  }

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
    setFirstPage,
    setLastPage,
    setNextPage,
    setPreviousPage,
  };
};
