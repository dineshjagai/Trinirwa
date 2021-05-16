import React, { useState, useEffect } from 'react';
import './Followers.css';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Follower from './Follower';
import ScrollDialog from './DisplayerDialog';
import { blockFollower, followUser, getFollowers } from './Module';
import { getCurrentUsername } from '../auth/authServices';

export default function Followers() {
  const user = getCurrentUsername();
  const [list, setFollowers] = useState([]);
  useEffect(() => {
    getFollowers(user).then((result) => {
      setFollowers(result.data.followers);
    });
  }, []);

  // handling blocking
  const handleB = (username) => {
    blockFollower(user, username).then((res) => {
      console.log(res.message);
      getFollowers(user).then((result) => {
        setFollowers(result.data.followers);
      });
    });
  };
  // handling following
  const handleF = (username) => {
    followUser(user, username).then((res) => {
      console.log(res.message);
      getFollowers(user).then((result) => {
        setFollowers(result.data.followers);
      });
    });
  };

  const items = list.map((e) => <Follower info={e} handleB={handleB} handleF={handleF} />);
  return (
    <div className="box-container">
      <div className="buttonFollowers">
        <ScrollDialog
          secondary="follower"
          title="All followers"
          secondTitle="All followers"
          getFunction={getFollowers}
          Icon={PersonAddIcon}
          handle={handleF}
          iconText="Follow"
        />
      </div>
      <div style={{ color: '#0C8367' }} className="title">Followers</div>
      <br />
      <div className="box">
        <div className="containers">
          {items}
        </div>
      </div>
    </div>
  );
}
