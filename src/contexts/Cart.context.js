import { createContext, useState, useEffect } from "react";

/*
This motherfucker takes the existing items and a new one.
The quantity on the new one is a delta, so it can be negative.
If we have the item passed in, we manipulate the quantity
with the delta. If the new quantity is 0, we return the 
original array without that item. If we do not have the 
item passed in, we add it to our array.
*/
const modifyCartItems = (cartItems, item) => {
  const newItemsArray = [...cartItems];
  const foundItem = cartItems.find((i) => i.id === item.id);
  if (foundItem) {
    const newQty = (foundItem.quantity += item.quantity);
    if (newQty === 0) {
      return cartItems.filter((i) => i.id !== item.id);
    } else {
      foundItem.quantity = newQty;
    }
  } else {
    newItemsArray.push(item);
  }
  console.log("modifyCartItems newItemsArray: ", newItemsArray);
  return newItemsArray;
};

/* Homeboy said "as the actual value you want to access"
But I have no idea what the fuck that means or what these do.
I make sure to keep these updated with the properties
in the value = {} below that is a prop for CartContext.Provider.
I have no idea why because when I didn't keep this updated 
everything still fucking worked?
*/
export const CartContext = createContext({
  isCartOpen: false,
  toggleCartOpen: () => {},
  cartItems: [],
  setCartCount: () => {},
  setCartTotalPrice: () => {},
  editCartItems: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
});

/*
This thing basically sort of works like a regular functional 
component with the state and effect and all that.
You take it and wrap it around whatever part of the app will
need access to this data/state - often in the main index.js file
*/
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  /*
  useEffect has to return a function, the function that makes the 
  changes to data/state. The array parameter is a list of things
  that when they change they trigger the function returned inside.
  So an empty array means only run that function one time
  */
  useEffect(() => {
    const newCartTotals = { count: 0, price: 0 };
    cartItems.forEach(({ quantity, price }) => {
      newCartTotals.count = newCartTotals.count + quantity;
      newCartTotals.price = newCartTotals.price + quantity * price;
    });
    setCartCount(newCartTotals.count);
    setCartTotalPrice(newCartTotals.price);
  }, [cartItems]);

  // This function handles all adding and removing of items to the cart
  const editCartItems = (itemToEdit) => {
    setCartItems(modifyCartItems(cartItems, itemToEdit));
  };

  // hide or show the cartdropdown
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  // This is where you pass through everything that needs
  // to be exposed to any child components inside the Provider
  const value = {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    editCartItems,
    cartCount,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
