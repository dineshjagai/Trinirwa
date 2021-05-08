import React from 'react';
import './Home.css';
import NavBar from './navBar';
import SideBar from './Sidebar';
import CommentBox from './CommentBox';

export default function Home() {
  const words = (window.location.href).split('/');
  const uid = words[words.length - 1];

  console.log(`uid home page${uid}`);
  return (
    <div className="home">
      <NavBar />
      <SideBar uid={uid} />
      <CommentBox uid={uid} />

    </div>
  );
}
