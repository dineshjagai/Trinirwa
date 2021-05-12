import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import { getTweets } from './Module';
import { getCurrentUsername } from '../auth/authServices';

export default function TweetDisplayer() {
  const user = getCurrentUsername();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getTweets(user).then((result) => {
      setTweets(result.data.tweets);
    });
  }, []);

  const items = tweets.map((tweet) => <Tweet key={tweet.tweet_id} data={tweet} />);
  return (
    <div>
      {items}
    </div>
  );
}
