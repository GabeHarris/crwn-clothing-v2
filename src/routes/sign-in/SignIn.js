import { Fragment } from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase";

const SignIn = () => {
  const logInGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
    console.log("SignIn userDocRef: ", userDocRef);
  };
  return (
    <Fragment>
      <h1>Sign In</h1>
      <button onClick={logInGoogleUser}>Sign In with Google Popup</button>
    </Fragment>
  );
};

export default SignIn;
