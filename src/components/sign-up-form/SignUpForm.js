import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase";

import { UserContext } from "../../contexts/UserContext";
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

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name: fieldName, value: fieldValue } = event.target;
    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setSignUpError(null);
    const { displayName, email, password, confirmPassword } = formFields;
    if (password !== confirmPassword || !email || !displayName) {
      setSignUpError({
        code: "That's horseshit.",
        message: "Fill it out right.",
      });
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocFromAuth(user, { displayName });
      setCurrentUser(user);
      resetFormFields();
      setSignUpError(null);
    } catch (error) {
      setSignUpError(error);
    }
  };

  const SignUpError = () => {
    return signUpError ? (
      <div className="form-error">
        {signUpError.message.split("Firebase: ")[1]}
      </div>
    ) : (
      ""
    );
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
