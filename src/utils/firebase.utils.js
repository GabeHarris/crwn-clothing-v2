import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2Evh1y5WEDws70TspeMPAzHg2BCUDzeE",
  authDomain: "crwn-clothing-db-e658a.firebaseapp.com",
  projectId: "crwn-clothing-db-e658a",
  storageBucket: "crwn-clothing-db-e658a.appspot.com",
  messagingSenderId: "279296541273",
  appId: "1:279296541273:web:a582484ba2bad1142ca748",
};

// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.error("error creating user: ", err);
    }
  }

  return userDocRef;
};

export const createProductsDocFromAuth = async (productAuth) => {
  if (!productAuth) return;
  const productsDocRef = doc(db, "products", productAuth.uid);

  const productsSnapshot = await getDoc(productsDocRef);

  if (!productsSnapshot.exists()) {
    try {
      await setDoc(productsDocRef, {});
    } catch (err) {
      console.error("error creating products: ", err);
    }
  }

  return productsDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

export const authWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
