import React, { useState, useEffect } from 'react';
import './Followers.css';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import Friend from './Friend';
import { blockFollower, getFriends, unfollowUser } from './Module';
import ScrollDialog from './DisplayerDialog';
import { getCurrentUsername } from '../auth/authServices';

export default function Friends() {
  const user = getCurrentUsername();
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFriends(user).then((result) => {
      setFriends(result.data.friends);
    });
  }, []);

  const handleB = (username) => {
    blockFollower(user, username).then((res) => {
      console.log(res.message);
      getFriends(user).then((result) => {
        setFriends(result.data.friends);
      });
    });
  };

  const handleU = (username) => {
    unfollowUser(user, username).then((res) => {
      console.log(res.message);
      getFriends(user).then((result) => {
        setFriends(result.data.friends);
      });
    });
  };
  const items = friends.map((e) => <Friend info={e} handleB={handleB} handleU={handleU} />);
  return (
    <div className="box-container">
      <div className="buttonFollowers">
        <ScrollDialog
          secondary="friends"
          title="All friends"
          secondTitle="All friends"
          getFunction={getFriends}
          Icon={PersonAddDisabledIcon}
          handle={handleU}
          iconText="Unfollow"
        />
      </div>
      <div className="title">Friends</div>
      <br />
      <div className="box">
        <div className="containers">
          {items}
        </div>
      </div>
    </div>
  );
}
