import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import Registration from './components/Registration';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';
import Home from './components/Home';
import { IdProvider } from './components/Context';
import Signup from './components/Signup';
import Temp from './components/Temp';
import ResetPassword from './components/ResetPassword';
import {
  userLogin, getNumberFailedLogins, updateNumberFailedLogins,
  getDateUserLastLockedOut, setLockOutTime,
} from './components/Module';

function App() {
  // const [uid, setUid] = useState('');
  const [user, setUsername] = useState('');
  const [numIncorrectLogins, setnumIncorrectLogins] = useState(0);
  const [dateUserLastLockedOut, setDateUserLastLockedOut] = useState('');
  // eslint-disable-next-line prefer-const
  let [isLockedOut] = useState(false);

  Axios.defaults.withCredentials = true;
  // const history = useHistory();

  // useEffect(() => setUid(uid), [uid, count]);
  useEffect(() => setnumIncorrectLogins(numIncorrectLogins), [numIncorrectLogins]);
  useEffect(() => console.log(`changed dateUserLastLockedOut ${dateUserLastLockedOut}`), [dateUserLastLockedOut]);
  // useEffect(() => console.log(`changed uid ${uid}`), [uid]);
  useEffect(() => console.log(`changed isLockedOut ${isLockedOut}`), [isLockedOut]);

  const handelLoginUid = (username, password) => {
    // const dateTime = new Date().toISOString();
    setUsername(username);
    userLogin(username, password).then((response) => {
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
                window.history.pushState(null, '', '/login');
                window.location.reload();
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
              // window.history.pushState(null, '', '/home');
              // window.location.reload();
              }
            } else {
              alert('your account has been locked because to too many incorrect attempts, please try back in an hour');
              window.history.pushState(null, '', '/login');
              window.location.reload();
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
    <IdProvider value={user}>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Registration />} />
          <Route path="/registration" exact render={() => <Registration />} />
          <Route path="/login" exact render={() => <Login handle={handelLoginUid} />} />
          <Route path="/signup/:username" exact render={() => <Signup />} />
          <Route path="/home" component={() => <Home />} />
          <Route path="/profile" exact render={() => <ProfilePage />} />
          <Route path="/resetPassword" exact render={() => <ResetPassword />} />
          <Route path="/temp" exact render={() => <Temp />} />
        </Switch>

      </Router>
    </IdProvider>
  );
}
export default App;
