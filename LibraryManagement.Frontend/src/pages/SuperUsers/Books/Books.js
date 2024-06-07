import { useEffect, useState } from "react";
import AddBookOverlay from "../../../components/Books/AddBookOverlay";
import BookListTable from "../../../components/Books/BookListTable";
import Pagination from "../../../components/Pagination";
import { getListBooks } from "../../../services/books";

const Books = () => {
  const [addBookDisplay, setAddBookDisplay] = useState(false);

  const [books, setBooks] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = () => {
    const params = {
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
    <div className={`min-h-full p-[20px] pt-[100px]`}>
      <div className="mb-6 flex justify-between">
        <button
          onClick={() => {
            setAddBookDisplay(true);
            document.body.classList.add("overflow-hidden");
          }}
          className="rounded-lg bg-[#d6001c] px-4 py-2 font-semibold text-white hover:bg-white hover:text-[#d6001c] hover:outline hover:outline-[#d6001c]"
        >
          Add
        </button>
        <div className="flex w-[400px] items-center justify-center">
          <div className="font-medium">Search</div>
          <input
            type="text"
            className="ml-4 w-full border border-slate-200 px-2 py-1 shadow-md focus:outline-none"
            placeholder="Search titles, authors, categories ..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </div>
      <BookListTable books={books?.data} onDelete={fetchBooks} />
      <div className="mt-6 flex w-full justify-end">
        <Pagination
          totalCount={books?.totalCount}
          itemsPerPage={booksPerPage}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </div>
      <AddBookOverlay
        display={addBookDisplay}
        onClose={() => {
          setAddBookDisplay(false);
          document.body.classList.remove("overflow-hidden");
        }}
      />
    </div>
  );
};

export default Books;
