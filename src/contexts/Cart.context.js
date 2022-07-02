import { createContext, useState, useEffect } from "react";

const addRemoveCartItem = (cartItems, item, add) => {
  const newItemsArray = [...cartItems];
  const foundItem = newItemsArray.find((i) => i.id === item.id);
  if (foundItem) {
    if (add) {
      foundItem.quantity++;
    } else {
      const index = newItemsArray.map((i) => i.id).indexOf(item.id);
      newItemsArray.splice(index, 1);
    }
  } else {
    if (add) {
      newItemsArray.push(item);
    }
  }
  return newItemsArray;
};

const modifyCheckoutItem = (cartItems, item) => {
  const newItemsArray = [...cartItems];
  const newItem = cartItems.find((i) => i.id === item.id);
  newItem.quantity = item.quantity;
  if (newItem.quantity < 1) {
    const index = newItemsArray.map((i) => i.id).indexOf(item.id);
    newItemsArray.splice(index, 1);
  }
  return newItemsArray;
};

// as the actual value you want to access
export const CartContext = createContext({
  isCartOpen: false,
  toggleCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  setCartCount: () => {},
  setCartTotalPrice: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  editCheckoutItem: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const newCartTotals = { count: 0, price: 0 };
    cartItems.forEach(({ quantity, price }) => {
      newCartTotals.count = newCartTotals.count + quantity;
      newCartTotals.price = newCartTotals.price + quantity * price;
    });
    setCartCount(newCartTotals.count);
    setCartTotalPrice(newCartTotals.price);
  }, [cartItems]);

  const addItemToCart = (itemToAdd) => {
    const newItemsArray = addRemoveCartItem(cartItems, itemToAdd, true);
    setCartItems(newItemsArray);
  };

  const removeItemFromCart = (itemToRemove) => {
    const newItemsArray = addRemoveCartItem(cartItems, itemToRemove, false);
    setCartItems(newItemsArray);
  };

  const editCheckoutItem = (itemToEdit) => {
    const newItemsArray = modifyCheckoutItem(cartItems, itemToEdit);
    setCartItems(newItemsArray);
  };

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const value = {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    editCheckoutItem,
    cartCount,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
