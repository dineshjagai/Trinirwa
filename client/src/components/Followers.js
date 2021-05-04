import React from 'react';
import './Followers.css';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Follower from './Follower';

export default function Followers({ input }) {
  const items = input.map((follower) => <Follower info={follower} />);
  return (
    <div className="box">
      <div className="buttonFollowers">
        <button className="btn" id="delete" style={{ color: '#00695c', border: 'none', backgroundColor: 'inherit' }} type="button"> All followers</button>
      </div>
      <div className="title">Followers</div>
      <br />
      <div className="containers">
        {items}
      </div>
    </div>
  );
}
