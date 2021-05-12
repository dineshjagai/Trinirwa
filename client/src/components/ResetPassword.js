import React, { useState } from 'react';
import {
  Link, useHistory,
} from 'react-router-dom';
import '../App.css';
import {
  isValidPassword, isSamePassword,
} from '../auth/authentication';
import { resetPassword } from './Module';

export default function ResetPassword() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordOneReg, setPasswordOneReg] = useState('');
  const [passwordTwoReg, setPasswordTwoReg] = useState('');
  const history = useHistory();
  const resetPasswrd = () => {
    // console.log('the actual username of this user is ', user);
    // if (!isSameUsername(usernameReg, user)) {
    //   alert('Wrong Username, please re-enter');
    //   window.history.replaceState(null, 'new page', '/resetPassword');
    //   window.location.reload();
    //   return;
    // }

    if (!isSamePassword(passwordOneReg, passwordTwoReg)) {
      alert('Passwords do not match, please re-enter');
      window.history.replaceState(null, 'new page', '/resetPassword');
      window.location.reload();
      return;
    }

    if (!isValidPassword(passwordOneReg)) {
      alert('Invalid password, password must have a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
      window.history.replaceState(null, 'new page', '/resetPassword');
      window.location.reload();
      return;
    }

    resetPassword(usernameReg, passwordOneReg).then(() => {
    //   console.log(response);
      alert('Success! Your Password Has Been Updated');
      // if valid signup proceed to the login page
      history.push('/login');
    }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <div className="card shadow mx-auto mt-5" style={{ width: '30rem' }}>
      <div className="container mx-1">
        <div className="card-body p-xs">
          <h2 className="card-title text-center font-weight-bold">Reset Password</h2>
          <div className="form-group">
            <label>Username:</label>
            <input
              id="new-username-form"
              placeholder="Enter Username"
              className="form-control"
              onChange={(e) => setUsernameReg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              id="new-password-form"
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPasswordOneReg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              id="new-password-form"
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPasswordTwoReg(e.target.value)}
            />
          </div>

          <div className="form-group text-center">

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={resetPasswrd}
            >
              Submit New Password
            </button>
          </div>
          <p>
            Changed Your Mind?&nbsp;
            <Link to="/login">Return To Login!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
