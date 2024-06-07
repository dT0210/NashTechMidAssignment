import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";
import { deleteBook, getBookDetails } from "../services/books";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const { user } = useAuthContext();
  const { cartItems, addToCart } = useCartContext();

  useEffect(() => {
    getBookDetails(id)
      .then((result) => {
        setBook(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const navigate = useNavigate();

  const handleDeleteBook = (id) => {
    const confirm = window.confirm("Do you really want to delete this book");
    if (confirm) {
      deleteBook(id)
        .then(() => {
          navigate("/books");
        })
        .catch((error) => {
          console.log(error);
          alert("Can't delete book");
        });
    }
  };

  return (
    <div className="min-h-full pt-[80px]">
      <div className="mx-auto w-[80%] p-[20px]">
        <div className="flex">
          <div className="w-[30%] px-10">
            <img src={book?.cover} alt="" className="" />
            <div className="mt-4 flex justify-center gap-2">
              {user.role === "Super" ? (
                <>
                  <Link
                    to={`/books/edit/${book?.id}`}
                    className="inline-block rounded bg-yellow-600 px-3 py-1 text-white"
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
              ) : (
                <button
                  className="rounded-md bg-[#e23347] p-2 text-white hover:bg-[#83394b]"
                  onClick={() => {
                    addToCart(book);
                  }}
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
          <div className="w-[70%] px-4">
            <div className="text-4xl font-medium">{book?.title}</div>
            <div>{book?.author}</div>
            <div>
              Status:{" "}
              {book?.isAvailable ? (
                <div className="inline text-green-600">Available</div>
              ) : (
                <div className="text-red-700">Unavailable</div>
              )}
            </div>
            <div className="mt-4 w-full">
              <div className="font-medium">Description</div>
              <div className="w-full">{book?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
