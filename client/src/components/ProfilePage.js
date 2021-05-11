import React, { useState, useContext, useEffect } from 'react';
import Profile from './ProfilePicture';
import NavBar from './navBar';
import Displayer from './Displayer';
import Followers from './Followers';
import Friends from './Friends';
import idContext from './Context';
import SearchBox from './Search2';
import TweetDisplayer from './tweetDisplayer';
import {
  addInterest, deleteInterest, getProfileData,
} from './Module';

export default function ProfilePage() {
  const username = useContext(idContext);
  const [info, setData] = useState([{}]);
  const [interests, setInterests] = useState(new Set());
  const [madeQuery, setMadeQuery] = useState(false);
  // const [tweets, setTweets] = useState([{}]);
  const [childKey, setChildKey] = useState(0);
  // const handleFetchTweets = () => {
  //   fetchTweets(id).then((result) => {
  //     setTweets(result.data);
  //   });
  // };

  useEffect(() => {
    getProfileData(username).then((result) => {
      console.log(result.data.data[0]);
      setData(result.data.data[0]);
      const newInterest = new Set((result.data.interests).map((obj) => obj.interest));
      setInterests(newInterest);
    }).catch((error) => {
      console.log(error.message);
    });
    setMadeQuery(true);
    // handleFetchTweets();
  }, []);

  const handleAddInterest = (newInterest) => {
    setInterests([...interests, newInterest]);
    setChildKey(Math.floor(Math.random() * 1000000000));
    addInterest(newInterest, username);
  };

  const handleDeleteInterest = (interest) => {
    const temp = interests;
    temp.delete(interest);
    setInterests(temp);
    setChildKey(Math.floor(Math.random() * 1000000000));
    deleteInterest(interest, username);
  };

  return madeQuery ? (
    <div className="profile">
      <div style={{
        width: '98%', margin: 'auto',
      }}
      >
        <div style={{ position: 'relative', top: '0px' }} className="rest">
          <NavBar />
          <Profile data={info} user={username} />
          <br />
          <div
            style={{
              width: '30%', margin: 'auto', marginRight: '1%',
            }}
            className="center"
          >
            <Displayer
              key={childKey}
              interests={interests}
              addInterest={handleAddInterest}
              deleteInterest={handleDeleteInterest}
            />
            <br />
            <Friends />
            <br />
            <Followers />
          </div>
        </div>
        <div id="center" className="center">
          <TweetDisplayer />
        </div>
        <div
          style={{
            position: 'relative',
            top: '-710px',
            width: '25%',
            display: 'inline-block',
          }}
          className="search"
        >
          <SearchBox />
        </div>
      </div>
    </div>

  ) : <div />;
}
