import React, { useState, useEffect } from 'react';
import Profile from './ProfilePicture';
import NavBar from './navBar';
import Displayer from './Displayer';
import Followers from './Followers';
import Friends from './Friends';

// import SearchBox from './Search2';
import DisplayerTweets from './CenterDisplay';
import './ProfilePage.css';
// import TweetDisplayer from './tweetDisplayer';
import {
  addInterest, deleteInterest, getProfileData,
} from './Module';
import { getCurrentUsername } from '../auth/authServices';

export default function ProfilePage() {
  // const username = useContext(idContext);
  const username = getCurrentUsername();
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
  // console.log(`local storage Username = ${newUsername}`);

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
      <div
        style={{
          width: '98%', margin: 'auto',
        }}
      >
        <div style={{ position: 'relative', top: '0px' }} className="rest">
          <NavBar />
          <Profile data={info} user={username} />
        </div>
        <div className="all_boxes">
          <div className="left-boxes">
            <div className="left-Displayer">
              <Displayer
                key={childKey}
                interests={interests}
                addInterest={handleAddInterest}
                deleteInterest={handleDeleteInterest}
              />
            </div>
            <div className="left-friends">
              <Friends />
            </div>
            <div className="left-followers">
              <Followers />
            </div>
          </div>
          <div className="right_boxes">
            <DisplayerTweets />
          </div>
        </div>
      </div>
    </div>

  ) : <div />;
}
