import React from 'react';
import './Home.css';
import NavBar from './navBar';
// import DisplayerTweets from './CenterDisplayerHome';
import SideBar from './SidebarU';
import SearchBox from './SearchBox2';
import Suggestions from './Suggestion';
import TweetsDisplayer from './TweetDisplayer';

export default function Home() {
  return (
    <div>
      <div className="nav_item">
        <NavBar />
      </div>
      <div className="home">
        <div className="sidebar_item">
          <SideBar />
        </div>
        <div className="center_item">
          <TweetsDisplayer />
        </div>
        <div className="right_item">
          <div className="searchbox">
            <SearchBox />
          </div>
          <div className="suggestionBox">
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
}
