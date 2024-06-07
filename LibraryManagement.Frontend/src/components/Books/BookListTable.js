import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { deleteBook } from "../../services/books";

const BookListTable = (props) => {
  const { books, onDelete } = props;
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleDeleteBook = (id) => {
    const confirm = window.confirm("Do you really want to delete this book");
    if (confirm) {
      deleteBook(id)
        .then(() => {
          onDelete();
          navigate("/books");
        })
        .catch((error) => {
          console.log(error);
          alert("Can't delete book");
        });
    }
  };

  return (
    <table className="w-full border-collapse border border-black">
      <thead>
        <tr>
          <th className="w-[150px] border border-black">Cover</th>
          <th className="w-[300px] border border-black">Title</th>
          <th className="border border-black">Author</th>
          <th className="border border-black">Category</th>
          <th className="w-[240px] border border-black">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books?.map((book) => (
          <tr className="border-b" key={book.id}>
            <td className="flex justify-center">
              <img className="h-[150px]" src={book.cover} alt="" />
            </td>
            <td className="px-4 text-center">{book.title}</td>
            <td className="px-4 text-center">{book.author}</td>
            <td className="px-4 text-center">{book.category.name}</td>
            <td className="">
              <div className="flex h-full items-center justify-center gap-2">
                <Link
                  to={`/books/${book.id}`}
                  className="rounded bg-[green] px-3 py-1 text-white"
                >
                  Details
                </Link>
                {user.role === "Super" && (
                  <>
                    <Link
                      to={`/books/edit/${book.id}`}
                      className="rounded bg-yellow-600 px-3 py-1 text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        handleDeleteBook(book.id);
                      }}
                      className="rounded bg-[#d6001c] px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookListTable;
