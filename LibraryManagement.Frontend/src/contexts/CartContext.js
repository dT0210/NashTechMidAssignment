import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({
  catItems: [],
  cartDisplay: false,
  setCartDisplay: () => {},
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  clearCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    if (cartItems.length === 5) {
      alert("You can only add 5 books to the cart");
      return;
    }
    setCartItems((prevItems) => {
      const itemExist = prevItems.some((i) => i.id === item.id);
      if (itemExist) {
        alert("Book is already in cart");
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const [cartDisplay, setCartDisplay] = useState(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartDisplay,
        setCartDisplay,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
