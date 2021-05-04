/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import { userLogin, getUid } from './Module';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [uid, setUid] = useState('');
  Axios.defaults.withCredentials = true;

  const login = () => {
    userLogin(username, password).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      } else {
        getUid(username).then((res) => {
          setUid(Array.from(res.data.data)[0].uid);
          console.log(Array.from(res.data.data)[0].uid);
          console.log(uid);
        }).catch((e) => {
          console.log(e);
        });
        history.push('/home/');
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            Forgot Password?&nbsp;
            <Link to="/">Click here to reset!</Link>
          </p>
          <div className="form-group text-center">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={login}
            >
              Log In
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
