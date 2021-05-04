/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Link, useHistory, BrowserRouter as Route,
} from 'react-router-dom';
import '../App.css';
import { userLogin, getUid } from './Module';
import Home from './Home';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [uid, setUid] = useState('');
  const [count, setCount] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  Axios.defaults.withCredentials = true;

  useEffect(() => setUid(uid), [uid, username, password, count, isAuth]);
  // useEffect(() => console.log(count), [count]);

  const login = async () => {
    userLogin(username, password).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
        // window.history.replaceState(null, 'new page', '/login');
        // window.location.reload();
        setUsername('');
        setPassword('');
        setUid('');
        setCount(count + 1);
        if (count >= 3) {
          // disable user from logging into the browser
          // TODO implement this
        }
        document.getElementById('new-password-form').value = '';
        document.getElementById('new-username-form').value = '';
      } else {
        setIsAuth(true);
        let fetchedUid = null;
        getUid(username).then((res) => {
          [fetchedUid] = [Array.from(res.data.data)[0].uid];
          setUid(fetchedUid);
          // window.history.replaceState({ fetchedUid }, 'new page', '/home');
          // window.location.reload();
        }).catch((e) => {
          console.log(e);
        });
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
              placeholder="Enter Username"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              id="new-password-form"
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            Forgot Password?&nbsp;
            <Link to="/">Click here to reset!</Link>
          </p>
          <div className="form-group text-center">
            {isAuth ? (
              <Link to="/home">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={login}
                >
                  Log In
                </button>
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={login}
              >
                Log In
              </button>
            )}
          </div>
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to="/registration">Sign Up!</Link>
            <Route path="/home/" component={() => <Home uid={uid} />} />
          </p>
        </div>
      </div>
    </div>
  );
}
