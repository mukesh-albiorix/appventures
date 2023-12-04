import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsSignedIn }) => {
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("isLogin", true);
    setIsSignedIn(localStorage.getItem("isLogin"));
    navigate("/");
  };

  return (
    <div className="login-bg">
      <form onSubmit={formSubmitHandler}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
