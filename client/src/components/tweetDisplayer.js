import React, { useContext, useState, useEffect } from 'react';
import Tweet from './Tweet';
import idContext from './Context';
import { getTweets } from './Module';

export default function TweetDisplayer() {
  const user = useContext(idContext);
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
