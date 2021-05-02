import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Profile from './ProfilePicture';
import NavBar from './navBar';
import Displayer from './Displayer';
// import Followers from './Followers';
import TweetDisplayer from './tweetDisplayer';
import { addInterest, deleteInterest, fetchTweets } from './Module';

export default function ProfilePage() {
  const words = (window.location.href).split('/');
  const id = words[words.length - 1];
  const url = `/profile/${id}`;
  const [info, setData] = useState([{}]);
  const [interests, setInterests] = useState(new Set());
  const [madeQuery, setMadeQuery] = useState(false);
  const [tweets, setTweets] = useState([{}]);
  const [childKey, setChildKey] = useState(0);
  // const [followers, setFollowers] = useState([]);

  const handleFetchTweets = () => {
    fetchTweets(id).then((result) => {
      setTweets(result.data);
    });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url,
    }).then((result) => {
      setData(result.data.data[0]);
      const newInterest = new Set((result.data.interests).map((obj) => obj.interest));
      setInterests(newInterest);
      setMadeQuery(true);
      handleFetchTweets();
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

      <NavBar />
      <div>
        <Profile data={info} />
        <br />
        <br />
      </div>
      <div className="center">

        <Displayer
          key={childKey}
          id={3}
          interests={interests}
          addInterest={handleAddInterest}
          deleteInterest={handleDeleteInterest}
        />
        <br />
        {/* <Followers input_followers={followers} /> */}
      </div>
      <div id="center" className="center">
        <TweetDisplayer tweets={tweets} />
      </div>
    </div>
  ) : <div />;
}
