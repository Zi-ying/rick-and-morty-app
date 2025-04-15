export const usePagination = (
  page: number,
  maxPage: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {

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
    setFirstPage,
    setLastPage,
    setNextPage,
    setPreviousPage,
  };
};
