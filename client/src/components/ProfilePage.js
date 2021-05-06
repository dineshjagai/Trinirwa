import React, { useState, useEffect } from 'react';
import Profile from './ProfilePicture';
import NavBar from './navBar';
import Displayer from './Displayer';
import Followers from './Followers';
import Friends from './Friends';
import TweetDisplayer from './tweetDisplayer';
import {
  addInterest, deleteInterest, fetchTweets, getProfileData,
} from './Module';

export default function ProfilePage({ id }) {
  const [info, setData] = useState([{}]);
  const [interests, setInterests] = useState(new Set());
  const [madeQuery, setMadeQuery] = useState(false);
  const [tweets, setTweets] = useState([{}]);
  const [childKey, setChildKey] = useState(0);
  const handleFetchTweets = () => {
    fetchTweets(id).then((result) => {
      setTweets(result.data);
    });
  };

  useEffect(() => {
    getProfileData(id).then((result) => {
      console.log(result.data.data[0]);
      setData(result.data.data[0]);
      const newInterest = new Set((result.data.interests).map((obj) => obj.interest));
      setInterests(newInterest);
    }).catch((error) => {
      console.log(error.message);
    });
    setMadeQuery(true);
    handleFetchTweets();
  }, []);

  const handleAddInterest = (newInterest) => {
    setInterests([...interests, newInterest]);
    setChildKey(Math.floor(Math.random() * 1000000000));
    addInterest(newInterest, id);
  };

  const handleDeleteInterest = (interest) => {
    const temp = interests;
    temp.delete(interest);
    setInterests(temp);
    setChildKey(Math.floor(Math.random() * 1000000000));
    deleteInterest(interest, id);
  };

  return madeQuery ? (
    <div className="profile">
      <div style={{
        width: '98%', margin: 'auto',
      }}
      >
        <NavBar />
        <Profile data={info} id={id} />
        <br />
        <div
          style={{
            width: '30%', margin: 'auto', marginRight: '1%',
          }}
          className="center"
        >
          <Displayer
            key={childKey}
            id={id}
            interests={interests}
            addInterest={handleAddInterest}
            deleteInterest={handleDeleteInterest}
          />
          <br />
          <Friends id={id} />
          <br />
          <Followers id={id} />
        </div>
      </div>
      <div id="center" className="center">
        <TweetDisplayer tweets={tweets} />
      </div>
    </div>
  ) : <div />;
}
