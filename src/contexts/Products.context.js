import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase.utils";

/* Homeboy said "as the actual value you want to access"
But I have no idea what the fuck that means or what these do.
I make sure to keep these updated with the properties
in the value = {} below that is a prop for CartContext.Provider.
I have no idea why because when I didn't keep this updated 
everything still fucking worked?
*/
export const ProductsContext = createContext({
  products: [],
});

/*
This thing basically sort of works like a regular functional 
component with the state and effect and all that.
You take it and wrap it around whatever part of the app will
need access to this data/state - often in the main index.js file
*/
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // this was just to load the shop data one time
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    // cannot use an async function as the anonymous function in useEffect,
    // you have to create another function to wrap the async call
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
