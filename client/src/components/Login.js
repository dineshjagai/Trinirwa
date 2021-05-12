import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Link, useHistory,
} from 'react-router-dom';
import '../App.css';
import {
  userLogin, getNumberFailedLogins, updateNumberFailedLogins,
  getDateUserLastLockedOut, setLockOutTime,
} from './Module';

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [numIncorrectLogins, setnumIncorrectLogins] = useState(0);
  const [dateUserLastLockedOut, setDateUserLastLockedOut] = useState('');
  // eslint-disable-next-line prefer-const
  let [isLockedOut] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => setnumIncorrectLogins(numIncorrectLogins), [numIncorrectLogins]);
  useEffect(() => console.log(`changed dateUserLastLockedOut ${dateUserLastLockedOut}`), [dateUserLastLockedOut]);
  // useEffect(() => console.log(`changed uid ${uid}`), [uid]);
  useEffect(() => console.log(`changed isLockedOut ${isLockedOut}`), [isLockedOut]);

  const loginOnClick = () => {
    // const dateTime = new Date().toISOString();
    setUsername(username);
    userLogin(username, password).then((response) => {
      localStorage.setItem('username', JSON.stringify(username));
      getNumberFailedLogins(username).then((resOne) => {
        console.log('resOne.data.message', resOne.data.message);
        // TODO: to fix
        if (resOne.data.message) {
          let fetchNumberFailedLogins = 0;
          [fetchNumberFailedLogins] = [Array.from(resOne.data.data)[0].number_failed_logins];
          setnumIncorrectLogins(fetchNumberFailedLogins);
          // new query
          getDateUserLastLockedOut(username).then((resTwo) => {
            let tmpDateUserLastLockedOut = '';
            [tmpDateUserLastLockedOut] = [Array.from(resTwo.data.data)[0].date_last_locked_out];
            // console.log('fetched fetchedNumberOfIncorrectLogins = ');
            // console.log(fetchNumberFailedLogins);
            setDateUserLastLockedOut(tmpDateUserLastLockedOut);
            if (fetchNumberFailedLogins > 3) {
              // setIsLockedOut(true);
              // const dateTimeOne = new Date(dateTime);
              // console.log('dateUserLastLockedOut = ', tmpDateUserLastLockedOut);
              // console.log('dateTimeTwo = ', tmpDateUserLastLockedOut);
              isLockedOut = true;
              const dateTimeTwo = new Date(tmpDateUserLastLockedOut);
              const timeDiffMs = new Date() - dateTimeTwo;
              const lockOutTime = 3600 * 1000; // one hour lockOut
              const isTimeOver = timeDiffMs > lockOutTime;
              console.log(`timeDiffMs : ${timeDiffMs}`);
              console.log(`isTimeOver : ${isTimeOver}`);
              if (isTimeOver) {
                isLockedOut = false;
                // reset
                updateNumberFailedLogins(username, 0).catch((e) => {
                  console.log(e);
                });
              }
              // setIsLockedOut(isTimeOver);
            }

            // console.log(`isLockedOut before if : ${isLockedOut}`);
            if (isLockedOut === false) {
              if (response.data.message) {
                // need to revoke login access to this account
                if (parseInt(fetchNumberFailedLogins, 10) === 3) {
                  setLockOutTime(username);
                }
                // console.log(`numIncorrectLogins =${fetchNumberFailedLogins}`);
                const numberFailedLoginsPlusOne = parseInt(fetchNumberFailedLogins, 10) + 1;
                alert(`You have${3 - numberFailedLoginsPlusOne} attempts left before you get locked out`);
                updateNumberFailedLogins(username, (numberFailedLoginsPlusOne))
                  .catch((e) => {
                    console.log(e);
                  });
                // document.getElementById('new-password-form').value = '';
                // document.getElementById('new-username-form').value = '';
                alert(response.data.message);
                history.push('/login/');
              } else {
                updateNumberFailedLogins(username, 0).catch((e) => {
                  console.log(e);
                });
                // const fetchedUid = null;
                // getUid(username).then((resThree) => {
                //   [fetchedUid] = [Array.from(resThree.data.data)[0].uid];
                //   console.log('fetched UID = ');
                //   console.log(fetchedUid);
                //   setUid(fetchedUid);
                // }).catch((e) => {
                //   console.log(e);
                // });
                history.push('/home/');

                // window.location.reload();
              }
            } else {
              alert('your account has been locked because to too many incorrect attempts, please try back in an hour');
              history.push('/login/');
            }
          }).catch((e) => {
            console.log(e);
          });
        } else {
          // user enters an erroneous username
          alert(resOne.data.message);
          window.history.pushState(null, '', '/login');
          window.location.reload();
        }
      }).catch((e) => {
        console.log(e);
      });
      // console.log(`Number Of Incorrect Logins${numIncorrectLogins}`);
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
            <Link to="/resetPassword">Click here to reset!</Link>
          </p>
          <div className="form-group text-center">
            <Link to="/home">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={loginOnClick}
              >
                Log In
              </button>
            </Link>
          </div>
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to="/registration">Sign Up!</Link>
            {/* <Route path="/home" component={() => <Home uid={uid} />} /> */}
          </p>
        </div>
      </div>
    </div>
  );
}
