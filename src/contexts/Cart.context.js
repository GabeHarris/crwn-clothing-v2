import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, newItem) => {
  const newItemsArray = [...cartItems];
  const foundItem = newItemsArray.find((i) => i.id === newItem.id);
  if (foundItem) {
    foundItem.quantity++;
  } else {
    newItemsArray.push(newItem);
  }
  return newItemsArray;
};

// as the actual value you want to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const newItemsArray = addCartItem(cartItems, productToAdd);
    setCartItems(newItemsArray);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
