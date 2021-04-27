import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from 'react-router-dom'

import "../App.css";

export default function Login() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const login = async () => {
    Axios.post("/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data.message);
      if (response.data.message) {
        setLoginStatus(response.data.message);
        alert(response.data.message)
      } else {
        setLoginStatus(response.data[0].username);
        history.push('/ProfilePage/:id');
      }
    });
  };


  return (
      <div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
      <div className="container mx-1">
        <div className="card-body p-xs">
          <h2 className="card-title text-center font-weight-bold">Log In</h2>
          <div className="form-group">
            <label>Username:</label>
            <input
              id="new-username-form"
              className="form-control"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group text-center">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={login}>Log In
            </button>
          </div>
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to="/registration">Sign Up!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
