import React from 'react';
import './Home.css';
import NavBar from './navBar';
import SideBar from './SidebarU';
import SearchBox from './SearchBox2';
import Suggestions from './Suggestion';
import FilteredTweetsDisplayer from './FilteredTweetsDisplayer';

export default function HashTagTweets() {
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
          <FilteredTweetsDisplayer />
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
