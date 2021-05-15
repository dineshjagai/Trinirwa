import React from 'react';
import './Home.css';
import NavBar from './navBar';
// import DisplayerTweets from './CenterDisplayerHome';
import DisplayerMessages from './CenterDisplayerMessages';
import { getCurrentReceiver } from '../auth/authServices';

export default function MessagePage() {
  const receiver = getCurrentReceiver();
  console.log(`receiver = ${receiver}`);

  return (
    <div>
      <NavBar />
      <div className="home">
        <div>
          <DisplayerMessages />
        </div>
      </div>
    </div>
  );
}
