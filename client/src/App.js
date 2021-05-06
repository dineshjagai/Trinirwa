import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
// import ProfilePage from './components/ProfilePage';
import { userLogin, getUid } from './components/Module';

function App() {
  const [uid, setUid] = useState('');
  const [count, setCount] = useState(0);
  Axios.defaults.withCredentials = true;

  // useEffect(() => setUid(uid), [uid, count]);
  useEffect(() => console.log(`changed uid ${uid}`), [uid]);
  // useEffect(() => {
  //   if (true) {
  //     window.history.replaceState({ uid }, 'new page', '/home');
  //     window.location.reload();
  //   }
  // }, [uid]);

  const handelLoginUid = (username, password) => {
    userLogin(username, password).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
        window.history.replaceState(null, 'new page', '/login');
        window.location.reload();
        // setUsername('');
        // setPassword('');
        setUid('');
        setCount(count + 1);
        if (count >= 3) {
          // disable user from logging into the browser
          // TODO implement this
        }
        document.getElementById('new-password-form').value = '';
        document.getElementById('new-username-form').value = '';
      } else {
        let fetchedUid = null;
        getUid(username).then((res) => {
          [fetchedUid] = [Array.from(res.data.data)[0].uid];
          console.log('fetched UID = ');
          console.log(fetchedUid);
          setUid(fetchedUid);
        }).catch((e) => {
          console.log(e);
        });
      }
    });
  };
  console.log(count);
  return (
    <Router>
      <Route path="/" exact render={() => <Registration />} />
      <Route path="/registration" exact render={() => <Registration />} />
      <Route path="/login" exact render={() => <Login handle={handelLoginUid} />} />
      <Route path="/home" component={() => <Home uid={uid} />} />
      {/* <Route path="/profile" exact render={() => <ProfilePage id={uid} />} /> */}
    </Router>
  );
}

export default App;
