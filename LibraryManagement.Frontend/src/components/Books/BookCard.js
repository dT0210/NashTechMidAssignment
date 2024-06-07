import { Link } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";

const BookCard = (props) => {
  const { cartItems, addToCart } = useCartContext();
  const { book } = props;
  return (
    <div className="w-[30%] rounded-md border border-slate-500 p-2 shadow-md">
      <div className="flex">
        <Link to={`/books/${book.id}`} className="w-[30%]">
          <img className="" src={book.cover} alt={book.title} />
        </Link>
        <div className="ml-2">
          <Link to={`/books/${book.id}`} className="text-2xl font-semibold">
            {book.title}
          </Link>
          <div className="text-sm italic">{book.author}</div>
          <div>{book.category.name}</div>
          <div>
            <button
              className="rounded-md bg-[#e23347] p-2 text-white hover:bg-[#83394b]"
              onClick={() => {
                addToCart(book);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
