/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import './Profile.css';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DialogPassword from './DialogPassword';
import DialogPasswordChange from './DialogPasswordChange';
import ScrollDialog from './DisplayerDialog';
import { getBlockedFollowers, unBlockUser } from './Module';
import idContext from './Context';

export default function Profile(props) {
  const user = useContext(idContext);
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
  const profilePicUrl = `/viewFile/${profilePic}`;
  return (
    <div className="container-profile">
      <div className="pictures">
        <img src={profilePicUrl} alt="" id="overlay" />
        <img src={profilePicUrl} alt="" id="originalDiv" />
      </div>
      <br />
      <div className="username">
        <span id="username">{props.data.username}</span>
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

// export default function Profile(props) {
//   return (
//     <div className="container-profile">
//       <div className="pictures">
//         <img src={props.data.profile_picture} alt="" id="overlay" />
//         <img src={props.data.profile_picture} alt="" id="originalDiv" />
//       </div>
//       <br />
//       <div className="username">
//         <span id="username">{props.data.username}</span>
//       </div>
//       <div className="deleteButton">
//         <DialogPassword id={props.id} />
//         <DialogPasswordChange id={props.id} />
//       </div>
//     </div>
//   );
// }
