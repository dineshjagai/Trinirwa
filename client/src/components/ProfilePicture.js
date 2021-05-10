/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './Profile.css';
import DialogPassword from './DialogPassword';
import DialogPasswordChange from './DialogPasswordChange';

export default function Profile(props) {
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
        <DialogPassword id={1220} />
        <DialogPasswordChange id={1220} />
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
