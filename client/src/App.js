import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import Registration from './components/Registration';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';
import Home from './components/Home';
import { IdProvider } from './components/Context';
import Signup from './components/Signup';
import Temp from './components/Temp';

// import ProfilePage from './components/ProfilePage';
import { userLogin, getUid } from './components/Module';

function App() {
  const [uid, setUid] = useState('');
  const [user, setUsername] = useState('');
  const [count, setCount] = useState(0);
  Axios.defaults.withCredentials = true;

  useEffect(() => console.log(`changed uid ${uid}`), [uid]);
  const handelLoginUid = (username, password) => {
    setUsername(username);
    userLogin(username, password).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
        window.history.replaceState(null, 'new page', '/login');
        window.location.reload();
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
          setUid(fetchedUid);
        }).catch((e) => {
          console.log(e);
        });
      }
    });
  };

  return (
    <IdProvider value={user}>
      <Router>
        <Route path="/" exact render={() => <Registration />} />
        <Route path="/registration" exact render={() => <Registration />} />
        <Route path="/login" exact render={() => <Login handle={handelLoginUid} />} />
        <Route path="/signup/:username" exact render={() => <Signup />} />
        <Route path="/home" component={() => <Home />} />
        <Route path="/profile" exact render={() => <ProfilePage />} />
        <Route path="/temp" exact render={() => <Temp />} />
      </Router>
    </IdProvider>
  );
}
export default App;
