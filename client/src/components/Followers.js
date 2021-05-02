import React, { useState } from 'react';
import './Followers.css';
import Follower from './Follower';

export default function Followers(props) {
  const [followers] = useState(props.input_followers);
  const items = followers.map((follower) => <Follower info={follower} />);
  return (
    <div className="containers">
      {items}
    </div>
  );
}
