import React from 'react';
import './Home.css';
import NavBar from './navBar';
import SideBar from './Sidebar';
import CommentBox from './CommentBox';

export default function Home(props) {
  const { uid } = props; // current user
  const { username } = props;
  return (
        <div className="home">
            <NavBar/>
            <SideBar uid= {uid} username={username}/>
            <CommentBox/>

        </div>
  );
}
