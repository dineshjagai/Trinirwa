import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Axios from 'axios';
import '../App.css';

const history = useHistory();

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post('/register', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
      history.push('/Signup/:id');
    });
  };

  return (
      <div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
      <div className="container mx-1">
        <div className="card-body p-xs">
          <h2 className="card-title text-center font-weight-bold">Sign Up</h2>
          <div className="form-group">
            <label>Username:</label>
            <input
              id="new-username-form"
              className="form-control"
              onChange={(e) => setUsernameReg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPasswordReg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={register}
              >
              Sign Up
            </button>
          </div>
          <p>
            Already have an account?&nbsp;
            <Link to="/login">Log in here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
