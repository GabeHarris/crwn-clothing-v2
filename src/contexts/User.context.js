import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocFromAuth,
} from "../utils/firebase.utils";

/* Homeboy said "as the actual value you want to access"
But I have no idea what the fuck that means or what these do.
I make sure to keep these updated with the properties
in the value = {} below that is a prop for CartContext.Provider.
I have no idea why because when I didn't keep this updated 
everything still fucking worked?
*/
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

/*
This thing basically sort of works like a regular functional 
component with the state and effect and all that.
You take it and wrap it around whatever part of the app will
need access to this data/state - often in the main index.js file
*/
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  /*
  useEffect allegedly has to return a function, the function that makes the 
  changes to data/state. The array parameter is a list of things
  that when they change they trigger the function returned inside.
  So an empty array means only run that function one time
  */
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
