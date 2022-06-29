import { createContext, useState } from "react";

const addCartItem = (cartItems, newItem) => {
  const newItemsArray = [...cartItems];
  const foundItem = newItemsArray.find((i) => i.id === newItem.id);
  if (foundItem) {
    foundItem.quantity++;
  } else {
    newItemsArray.push(newItem);
  }
  console.log(newItemsArray);
  return newItemsArray;
};

// as the actual value you want to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  cartItemTotalQuantity: 0,
  setCartItemTotalQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemTotalQuantity, setCartItemTotalQuantity] = useState(0);

  const updateTotalQuantity = (itemsArray) => {
    let count = 0;
    const itemsLength = itemsArray.length;
    for (let i = 0; i < itemsLength; i++) {
      const item = itemsArray[i];
      count += item.quantity;
    }
    setCartItemTotalQuantity(count);
  };

  const addItemToCart = (productToAdd) => {
    const newItemsArray = addCartItem(cartItems, productToAdd);
    updateTotalQuantity(newItemsArray);
    setCartItems(newItemsArray);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    cartItemTotalQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
