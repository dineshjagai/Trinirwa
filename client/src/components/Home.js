import React from 'react';
import './Home.css';
import NavBar from './navBar';
import DisplayerTweets from './CenterDisplayerHome';
import SideBar from './SidebarU';
import SearchBox from './SearchBox';

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="home">
        <div>
          <SideBar />
        </div>
        <div>
          <DisplayerTweets />
        </div>
        <div className="searchBack">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
