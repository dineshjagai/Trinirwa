import React, { useState, useEffect } from 'react';
import './Followers.css';
import Follower from './Follower';
import { blockFollower, followUser, getSuggestions } from './Module';
import { getCurrentUsername } from '../auth/authServices';

export default function Suggestions() {
  const user = getCurrentUsername();
  const [suggestions, setSuggestions] = useState([]);
  const getData = async () => {
    await getSuggestions(user).then((result) => {
      if (suggestions.length === 4) {
        suggestions.push(result.data.suggestions[0]);
      } else {
        setSuggestions(result.data.suggestions);
      }
    }).catch((err) => console.log(err.message));
  };
  const updateList = async (username) => {
    const newArray = suggestions.filter((e) => e.username !== username);
    await getSuggestions(user).then((result) => {
      newArray.push(result.data.suggestions[0]);
    }).catch((err) => console.log(err.message));
    setSuggestions(newArray);
  };

  useEffect(() => {
    getData();
  }, []);

  // handling blocking
  const handleB = (username) => {
    updateList(username);
    blockFollower(user, username).then((res) => {
      console.log(res.message);
    });
  };
  // handling following
  const handleF = (username) => {
    updateList(username);
    followUser(user, username).then((res) => {
      console.log(res.message);
    });
  };

  return (
    <div className="box-container">
      <div style={{ color: '#0C8367' }} className="title">Suggestions</div>
      <br />
      <div className="box">
        <div className="containers">
          {suggestions.map((e) => <Follower info={e} handleB={handleB} handleF={handleF} />)}
        </div>
      </div>
    </div>
  );
}
