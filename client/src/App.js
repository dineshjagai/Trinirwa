import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <Route path="/" exact render={() => <Registration/>} />
      <Route path="/registration" exact render={() => <Registration/>} />
      <Route path="/login" exact render={() => <Login />} />
      <Route path="/profile/:id" exact render={() => <ProfilePage/>}/>
    </Router>
  );
}

export default App;
