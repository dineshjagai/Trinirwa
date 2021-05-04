/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './Profile.css';
import DialogPassword from './DialogPassword';
import DialogPasswordChange from './DialogPasswordChange';

export default function Profile(props) {
  return (
    <div className="container-profile">
      <div className="pictures">
        <img src={props.data.profile_picture} alt="" id="overlay" />
        <img src={props.data.profile_picture} alt="" id="originalDiv" />
      </div>
      <br />
      <div className="username">
        <span id="username">{props.data.username}</span>
      </div>
      <div className="deleteButton">
        <DialogPassword id={props.id} />
        <DialogPasswordChange id={props.id} />
      </div>
    </div>
  );
}
