/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './Profile.css';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DialogPassword from './DialogPassword';
import DialogPasswordChange from './DialogPasswordChange';
import ScrollDialog from './DisplayerDialog';
import { getBlockedFollowers, unBlockUser } from './Module';
import { getCurrentUsername } from '../auth/authServices';

export default function Profile(props) {
  const user = getCurrentUsername();

  let date = 0;
  console.log(props.data);
  if (typeof props.data !== 'undefined') {
    date = (props.data.date);
  }
  const handleUnblock = (username) => {
    unBlockUser(user, username).then((res) => {
      console.log(res.message);
      getBlockedFollowers(user).then((result) => {
        console.log(result.data.friends);
      });
    });
  };

  const profilePic = props.data.profile_picture;
  console.log(`pics${profilePic}`);
  const profilePicUrl = `/api/viewFile/${profilePic}`;
  return (
    <div className="container-profile">
      <div className="pictures">
        <img src={profilePicUrl} alt="" id="overlay" />
        <img src={profilePicUrl} alt="" id="originalDiv" />
      </div>
      <br />
      <div className="username">
        <span style={{ color: '#0C8367' }} id="username">{props.data.username}</span>
        <span style={{ color: '#0C8367' }} id="username">{`Since: ${date}`}</span>
      </div>
      <div className="deleteButton">
        <ScrollDialog
          secondary="blocked"
          title="My Blocked Users"
          secondTitle="Blocked Users"
          getFunction={getBlockedFollowers}
          Icon={LockOpenIcon}
          handle={handleUnblock}
          iconText="Unblock User"
        />
        <DialogPassword />
        <DialogPasswordChange />
      </div>
    </div>
  );
}
