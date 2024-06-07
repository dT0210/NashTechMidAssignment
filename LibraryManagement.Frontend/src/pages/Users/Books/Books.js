import { useEffect, useState } from "react";
import BookCard from "../../../components/Books/BookCard";
import Pagination from "../../../components/Pagination";
import { getListBooks } from "../../../services/books";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(9);
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = () => {
    const params = {
      isAvailable: true,
      page: currentPage,
      perPage: booksPerPage,
      search: searchQuery,
    };
    getListBooks(params)
      .then((result) => {
        setBooks(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, booksPerPage, searchQuery]);

  useEffect(() => {
    if (
      books?.totalCount <= (currentPage - 1) * booksPerPage &&
      currentPage > 1
    )
      setCurrentPage(currentPage - 1);
  }, [books]);

  return (
    <div className="min-h-full p-[20px] pt-[100px]">
      <div className="mb-6 flex w-[full] items-center justify-end">
        <div className="font-medium">Search</div>
        <input
          type="text"
          className="ml-4 w-[400px] border border-slate-200 px-2 py-1 shadow-md focus:outline-none"
          placeholder="Search titles, authors, categories ..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <div className="flex w-full flex-wrap justify-between gap-4">
        {books?.data?.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
      <div className="mt-[20px] flex justify-end">
        <Pagination
          itemsPerPage={booksPerPage}
          totalCount={books?.totalCount}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Books;
