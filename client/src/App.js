import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Temp from './components/Temp';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Registration />} />
        <Route path="/registration" exact render={() => <Registration />} />
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/signup/" exact render={() => <Signup />} />
        <Route path="/home" component={() => <Home />} />
        <Route path="/profile" exact render={() => <ProfilePage />} />
        <Route path="/resetPassword" exact render={() => <ResetPassword />} />
        <Route path="/temp" exact render={() => <Temp />} />
      </Switch>
    </Router>
  );
}
export default App;
