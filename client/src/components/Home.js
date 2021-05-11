import React from 'react';
import './Home.css';
import NavBar from './navBar';
import DisplayerTweets from './CenterDisplay';
import SideBar from './SidebarU';

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="home">
        <div
          style={{
          }}
        >
          <SideBar />
        </div>
        <div
          style={{
          }}
        >
          <DisplayerTweets />
        </div>
      </div>
    </div>
  );
}
