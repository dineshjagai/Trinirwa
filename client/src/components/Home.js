import React from 'react';
import "./Home.css";
import Tweet from './Tweet.js';
import NavBar from './navBar';
import SideBar from './Sidebar';
import CommentBox from './CommentBox';

export default function Home(props) {
    let uid = props.uid; // current user
    let username = props.username;

    return (
        <div className="home">   
            <NavBar/>
            <SideBar uid= {uid} username={username}/>
            <CommentBox/>
 
        </div>
    );
    
}

