import { Fragment } from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase";

import SignUpForm from "../../components/sign-up-form/SignUpForm";

const SignIn = () => {
  const logInGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
    console.log("SignInPopUp userDocRef: ", userDocRef);
  };
  return (
    <Fragment>
      <h1>Sign In</h1>
      <p>
        <button onClick={logInGoogleUser}>Sign In with Google Popup</button>
      </p>
      <SignUpForm />
    </Fragment>
  );
};

export default SignIn;
