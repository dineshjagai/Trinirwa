import React from 'react';
import './Follower.css';

export default function Follower({ info }) {
  return (
    <div onH className="followerContainer">
      <div className="myimgContainer">
        <img
          className="myimg"
          src={info.profile_picture}
          alt=""
        />
      </div>
      <div className="text">{info.username}</div>
    </div>
  );
}
