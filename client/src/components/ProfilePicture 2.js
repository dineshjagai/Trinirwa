import React from 'react';
import './Profile.css';

export default function Profile(props) {
  return (
        <div className= "pictures">
            <img className = "pictures" src = {props.picture.profile_picture} id = "overlay"></img>
            <img className="pictures" src = {props.picture.profile_picture} id = "originalDiv"></img>
        </div>
  );
}
