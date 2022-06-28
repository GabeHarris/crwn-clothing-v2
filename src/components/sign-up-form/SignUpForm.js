import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase";

import TextField from "../form-input/TextField";
import Button from "../button/Button";
import "./sign-up.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const [signUpError, setSignUpError] = useState(null);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    console.log("change");
    const { name: fieldName, value: fieldValue } = event.target;
    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { displayName, email, password, confirmPassword } = formFields;
    if (password !== confirmPassword || !email || !displayName) {
      setSignUpError({ code: "Horseshit", message: "fill it out right" });
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
      setSignUpError(null);
    } catch (error) {
      console.error(error);
      setSignUpError(error);
    }
  };

  const SignUpError = () => {
    return signUpError ? (
      <div>
        Error {signUpError.code}, {signUpError.message}
        <br />
      </div>
    ) : (
      ""
    );
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with Email/Password</span>
      <SignUpError />
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          required
          name="displayName"
          labelText="Display Name"
          value={displayName}
          onChange={handleChange}
        />
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
        <TextField
          type="password"
          required
          name="confirmPassword"
          labelText="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
