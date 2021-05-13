/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import './Followers.css';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { useHistory } from 'react-router-dom';
import Friend from './Friend';
import { blockFollower, getFriends, unfollowUser } from './Module';
import ScrollDialog from './DisplayerDialog';
import { getCurrentUsername } from '../auth/authServices';

export default function Friends() {
  const history = useHistory();
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

  const handleMessage = (username) => {
    console.log(username);
    localStorage.setItem('receiver', JSON.stringify(username));
    history.push('/message');
  };

  const items = friends.map((e) => <Friend info={e} handleMessage={handleMessage} handleB={handleB} handleU={handleU} />);
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
