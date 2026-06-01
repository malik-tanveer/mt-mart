// CART CONTEXT
"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({
  children,
}) => {

  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {

    setCartItems((prev) => [
      ...prev,
      product,
    ]);
  };

  // REMOVE
  const removeFromCart = (id) => {

    setCartItems((prev) =>
      prev.filter(
        (item) => item._id !== id
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);