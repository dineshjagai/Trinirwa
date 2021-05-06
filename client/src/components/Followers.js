import React, { useState, useEffect } from 'react';
import './Followers.css';
import Follower from './Follower';
import ScrollDialog from './ScrollDialog';
import { blockFollower, followUser, getFollowers } from './Module';

export default function Followers({ id }) {
  const [list, setFollowers] = useState([]);
  useEffect(() => {
    getFollowers(id).then((result) => {
      setFollowers(result.data.followers);
    });
  }, []);

  // handling blocking
  const handleB = (username) => {
    blockFollower(id, username).then((res) => {
      console.log(res.message);
      getFollowers(id).then((result) => {
        setFollowers(result.data.followers);
      });
    });
  };
  // handling following
  const handleF = (username) => {
    followUser(id, username).then((res) => {
      console.log(res.message);
      getFollowers(id).then((result) => {
        setFollowers(result.data.followers);
      });
    });
  };

  const items = list.map((user) => <Follower info={user} handleB={handleB} handleF={handleF} />);
  return (
    <div className="box-container">
      <div className="buttonFollowers">
        <ScrollDialog />
      </div>
      <div className="title">Followers</div>
      <br />
      <div className="box">
        <div className="containers">
          {items}
        </div>
      </div>
    </div>
  );
}
