import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import VideoChat from './live_stream/VideoChat';
import ResetPassword from './components/ResetPassword';
import MessagePage from './components/MessagePage';
import HashTagTweets from './components/HashTagTweets';

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
        <Route path="/videochat" exact render={() => <VideoChat />} />
        <Route path="/message" exact render={() => <MessagePage />} />
        <Route path="/hashTagTweets" exact render={() => <HashTagTweets />} />
      </Switch>
    </Router>
  );
}
export default App;
