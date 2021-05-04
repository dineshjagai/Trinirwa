import React from 'react';
import './Home.css';
import NavBar from './navBar';
import SideBar from './Sidebar';
import CommentBox from './CommentBox';

export default function Home({ uid }) {
  console.log(`uid home page${uid}`);
  return (
    <div className="home">
      <NavBar />
      <SideBar uid={uid} />
      <CommentBox uid={uid} />

    </div>
  );
}
