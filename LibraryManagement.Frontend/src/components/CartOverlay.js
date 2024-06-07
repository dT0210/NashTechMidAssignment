import { useAuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";
import useClickOutside from "../hooks/useClickOutside";
import { createBorrowingRequest } from "../services/booksBorrowing";

const CartOverlay = () => {
  const { cartItems, cartDisplay, setCartDisplay, removeFromCart, clearCart } =
    useCartContext();
  const onClose = () => {
    setCartDisplay(false);
    document.body.classList.remove("overflow-hidden");
  };
  const modalRef = useClickOutside(onClose);

  const { isAuthenticated, user } = useAuthContext();

  const handleSubmitRequest = () => {
    if (!isAuthenticated) {
      alert("Please login to borrow books");
      return;
    }
    if (cartItems.length === 0) {
      alert("No items in cart");
      return;
    }
    const request = {
      requestorId: user.id,
      books: cartItems.map((item) => item.id),
    };
    createBorrowingRequest(request)
      .then(() => {
        alert("Request submitted successfully");
        clearCart();
        onClose();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <div
      className={`absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 pt-[80px] ${cartDisplay ? "block" : "hidden"}`}
    >
      <div
        ref={modalRef}
        className="relative mx-auto flex h-[85%] w-[80%] items-center justify-center rounded-2xl bg-white pb-[50px] pt-[50px]"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 bg-transparent text-xl font-semibold text-black"
        >
          &#10005;
        </button>
        <div className="absolute left-3 top-3 text-2xl font-medium">
          Cart details
        </div>
        <div className="h-full w-full overflow-y-scroll px-4">
          <div className="h-full w-full">
            {cartItems.length === 0 ? (
              <div className="w-full text-center text-3xl font-medium">
                No items in cart
              </div>
            ) : (
              <table className="w-full text-center">
                <thead>
                  <tr>
                    <th className="w-[20px]">No.</th>
                    <th className="w-[100px]">Book Cover</th>
                    <th>Book Title</th>
                    <th className="w-[200px]">Author</th>
                    <th className="w-[100px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="flex h-[120px] justify-center">
                        <img
                          className=""
                          src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688494248i/123856309.jpg"
                          alt={item.title}
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.author}</td>
                      <td>
                        <button
                          className="rounded bg-[#e23347] p-2 font-medium text-white"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <button
          className="absolute bottom-3 left-3 rounded bg-[#e23347] p-2 font-medium text-white"
          onClick={clearCart}
        >
          Clear cart
        </button>
        <button
          className="absolute bottom-3 right-3 rounded bg-[green] p-2 font-medium text-white"
          onClick={handleSubmitRequest}
        >
          Submit borrow request
        </button>
      </div>
    </div>
  );
};

export default CartOverlay;
