import React, { useState } from "react";
import "./LoginForm.css";
import Card from "../Card/Card";
import { logdata } from "../../assets/data/logdata";
const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    email: "Invalid email or password",
    password: "Invalid password",
    noEmail: "Please enter your email",
    noPassword: "Please enter your password",
  };

  const handleSubmit = (e) => {
    // Prevent page from reloading
    e.preventDefault();

    if (!email) {
      // Email input is empty
      setErrorMessages({ name: "noEmail", message: errors.noEmail });
      return;
    }

    if (!password) {
      // Password input is empty
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }

    // Search for admin credentials
    const currentAdmin = logdata.find((admin) => admin.email === email);

    if (currentAdmin) {
      if (currentAdmin.password !== password) {
        // Wrong password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        // Correct password, log in user
        setErrorMessages({});
        // setIsLoggedIn(true);
        localStorage.setItem("isAdmin", true);
        window.location.reload();
      }
    } else {
      // email doens't exist in the database
      setErrorMessages({ name: "email", message: errors.email });
    }
  };

  // Render error messages
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );

  return (
    <Card>
      <h1 className="title">Sign In</h1>
      <p className="subtitle">
        Please log in using your email and password!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="floatingInput">Email</label>
          {renderErrorMsg("email")}
          {renderErrorMsg("noEmail")}
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control "
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="floatingPassword">Password</label>
          {renderErrorMsg("password")}
          {renderErrorMsg("noPassword")}
        </div>

        <input type="submit" value="Log In" className="login_button" />
      </form>
    </Card>
  );
};

export default LoginForm;
