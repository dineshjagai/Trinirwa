import React, { useState, useEffect, useContext } from 'react';
import './Followers.css';
import Friend from './Friend';
import { blockFollower, getFriends, unfollowUser } from './Module';
import idContext from './Context';
import ScrollDialog from './DisplayerDialog';

export default function Friends() {
  const user = useContext(idContext);
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
        <ScrollDialog />
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
