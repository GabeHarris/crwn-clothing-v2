import { useState } from "react";
import {
  authWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase.utils";

import TextField from "../form-input/TextField.component";
import Button from "../button/Button.component";
import "./sign-in.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const [signInError, setSignInError] = useState(null);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name: fieldName, value: fieldValue } = event.target;
    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setSignInError(null);
    const { email, password } = formFields;
    if (!email || !password) {
      setSignInError({
        code: "That's horseshit.",
        message: "Fill it out right.",
      });
      return;
    }
    try {
      const { user } = await authWithEmailAndPassword(email, password);
      resetFormFields();
      setSignInError(null);
    } catch (error) {
      setSignInError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGooglePopup();
  };

  const SignInError = () => {
    return signInError ? (
      <div className="form-error">
        {signInError.message.split("Firebase: ")[1]}
      </div>
    ) : (
      ""
    );
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <SignInError />
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          required
          name="email"
          labelText="Email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          required
          name="password"
          labelText="Password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={handleGoogleSignIn}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
