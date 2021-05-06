import React, { useState, useEffect } from 'react';
import './Followers.css';
import Friend from './Friend';
import { blockFollower, getFriends, unfollowUser } from './Module';

export default function Friends({ id }) {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFriends(id).then((result) => {
      setFriends(result.data.followers);
    });
  }, []);

  const handleB = (username) => {
    blockFollower(id, username).then((res) => {
      console.log(res.message);
      getFriends(id).then((result) => {
        setFriends(result.data.followers);
      });
    });
  };

  const handleU = (username) => {
    unfollowUser(id, username).then((res) => {
      console.log(res.message);
      getFriends(id).then((result) => {
        setFriends(result.data.followers);
      });
    });
  };

  const items = friends.map((user) => <Friend info={user} handleB={handleB} handleU={handleU} />);
  return (
    <div className="box-container">
      <div className="buttonFollowers">
        <button className="btn" id="delete" style={{ color: '#00695c', border: 'none', backgroundColor: 'inherit' }} type="button"> All friends</button>
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
