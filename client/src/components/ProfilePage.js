import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Profile from './ProfilePicture';
import NavBar from './navBar';
import Displayer from './Displayer';
import Followers from './Followers';
import TweetDisplayer from './tweetDisplayer';

export default function ProfilePage(props) {
  const id = props.uid;
  const url = `/profile/${id}`;
  const [info, setData] = useState([{}]);
  const [followers, setFollowers] = useState({});
  const [interests, setInterests] = useState(new Set());
  const [madeQuery, setMadeQuery] = useState(false);
  const [tweets, setTweets] = useState([{}]);
  const [childKey, setChildKey] = useState(0);

  const fetchTweets = () => {
    const getUrl = `/profile/tweet/${id}`;
    axios({
      method: 'GET',
      url: getUrl,
    }).then((result) => {
      setTweets(result.data);
    });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url,
    }).then((result) => {
      setData(result.data.data[0]);
      setFollowers(result.data.followers);
      const newInterest = new Set((result.data.interests).map((obj) => obj.interest));
      setInterests(newInterest);
      setMadeQuery(true);
      fetchTweets();
    });
  }, []);

  const addInterest = (newInterest) => {
    setInterests([...interests, newInterest]);
    setChildKey(Math.floor(Math.random() * 1000000000));
    const addUrl = `/profile/interest/${id}`;
    axios({
      method: 'POST',
      url: addUrl,
      data: {
        interest: newInterest,
      },
    });
  };

  const deleteInterest = (interes) => {
    const temp = interests;
    temp.delete(interes);
    setInterests(temp);
    setChildKey(Math.floor(Math.random() * 1000000000));
    const delUrl = `/profile/delete/interest/${id}`;
    axios({
      method: 'DELETE',
      url: delUrl,
      data: {
        interest: interes,
      },
    });
  };

  return madeQuery ? (
    <div className="profile">

       <NavBar/>
       <div>
          <Profile picture= {info}/>
          <br></br>
          <br></br>
       </div>
        <div className = "center">

           <Displayer key={childKey} id = {3} interests={interests}
            addInterest = {addInterest} deleteInterest={deleteInterest}/>
            <br></br>
          <Followers input_followers={followers}/>
        </div>
        <div id = "center"className="center">
           <TweetDisplayer tweets={tweets}/>
        </div>
    </div>
  ) : <div></div>;
}
