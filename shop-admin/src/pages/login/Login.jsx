import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/apiCalls";

import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { isFetching, error } = useSelector((state) => state.user);
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="title">SIGN IN</h1>
        <form>
          <input
            placeholder="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            placeholder="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleLogin} className={isFetching ? "disable" : ""}>
            LOGIN
          </button>
          {error && <div className="error">Something went wrong</div>}
          <Link to="/#">DO NOT YOU REMEMBER THE PASSWORD?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
