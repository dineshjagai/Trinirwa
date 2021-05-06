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
