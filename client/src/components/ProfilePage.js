import React, { useState, useEffect } from 'react';
import Profile from './ProfilePicture';
import NavBar from './navBar';
import Displayer from './Displayer';
import Followers from './Followers';
import TweetDisplayer from './tweetDisplayer';
import {
  addInterest, deleteInterest, fetchTweets, getProfileData, getFollowers,
} from './Module';

export default function ProfilePage({ id }) {
  const [info, setData] = useState([{}]);
  const [interests, setInterests] = useState(new Set());
  const [madeQuery, setMadeQuery] = useState(false);
  const [tweets, setTweets] = useState([{}]);
  const [childKey, setChildKey] = useState(0);
  const [followers, setFollowers] = useState([]);
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
    getFollowers(id).then((result) => {
      setFollowers(result.data.followers);
      console.log(followers);
    });
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
            width: '%', margin: 'auto', marginRight: '1%',
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
          { true ? <Followers input={followers} /> : <div>haha</div>}
        </div>
      </div>
      <div id="center" className="center">
        <TweetDisplayer tweets={tweets} />
      </div>
    </div>
  ) : <div />;
}
