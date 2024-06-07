import { useState } from "react";

const Pagination = (props) => {
  const { itemsPerPage, totalCount, handlePagination, currentPage } = props;
  const [page, setPage] = useState(currentPage);
  const totalPageCount = Math.ceil(totalCount / itemsPerPage);

  const handlePrevClick = () => {
    if (page === 1) return;
    setPage(page - 1);
    handlePagination(page - 1);
  };

  const handleNextClick = () => {
    if (page === totalPageCount) return;
    setPage(page + 1);
    handlePagination(page + 1);
  };

  const handlePageChange = (e) => {
    const newPage = parseInt(e.target.value);
    if (isNaN(newPage) || newPage < 1 || newPage > totalPageCount) {
      setPage(1);
      handlePagination(1);
      return;
    }
    setPage(newPage);
    handlePagination(newPage);
  };

  return (
    <div className="">
      <button
        className="border border-slate-300 p-1"
        onClick={handlePrevClick}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="mx-3">
        <input
          type="number"
          value={page}
          className="w-8 text-right"
          onChange={handlePageChange}
        />
        /{totalPageCount}
      </span>
      <button
        className="border border-slate-300 p-1"
        onClick={handleNextClick}
        disabled={page === totalPageCount}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
