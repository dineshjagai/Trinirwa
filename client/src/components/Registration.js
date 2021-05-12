/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { addUser } from './Module';
import '../App.css';
import {
  isValidPassword, isValidUsername, isValidEmail, isSamePassword,
} from '../auth/authentication';

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordOneReg, setPasswordOneReg] = useState('');
  const [passwordTwoReg, setPasswordTwoReg] = useState('');
  const [firstNameReg, setFirstNameReg] = useState('');
  const [lastNameReg, setLastNameReg] = useState('');
  const [email, setEmailReg] = useState('');
  const history = useHistory();

  Axios.defaults.withCredentials = true;

  const register = () => {
    if (!isSamePassword(passwordOneReg, passwordTwoReg)) {
      alert('Passwords do not match, please re-enter');
      document.getElementById('new-password-form').value = '';
      document.getElementById('new-password-two-form').value = '';
      return;
    }

    if (!isValidUsername(usernameReg)) {
      alert('Invalid User Name');
      document.getElementById('new-username-form').value = '';
      return;
    }

    if (!isValidPassword(passwordOneReg)) {
      alert('Invalid password, password must have a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
      document.getElementById('new-password-form').value = '';
      document.getElementById('new-password-two-form').value = '';
      return;
    }

    if (!isValidEmail(email)) {
      alert('Invalid email, please re-enter');
      document.getElementById('exampleInputEmail1').value = '';
      return;
    }

    addUser(usernameReg, passwordOneReg, firstNameReg, lastNameReg, email).then((response) => {
      console.log(response);
      // if valid signup proceed to the login page
      history.push(`/signup/${usernameReg}`);
    }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
      <div className="container mx-1">
        <div className="card-body p-xs">
          <h2 className="card-title text-center font-weight-bold">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="new-username-form">Username:</label>
            <input
              id="new-username-form"
              placeholder="Enter Username"
              className="form-control"
              onChange={(e) => setUsernameReg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmailReg(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="name"
              id="new-first-name-form"
              className="form-control"
              placeholder="Enter First Name"
              onChange={(e) => setFirstNameReg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="name"
              id="new-last-name-form"
              placeholder="Enter Last Name"
              className="form-control"
              onChange={(e) => setLastNameReg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              id="new-password-form"
              aria-describedby="passwordHelp"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPasswordOneReg(e.target.value)}
            />
            <small id="passwordHelp" className="form-text text-muted">Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</small>

          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              id="new-password-two-form"
              className="form-control"
              placeholder="Re-Enter Password"
              onChange={(e) => setPasswordTwoReg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
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
