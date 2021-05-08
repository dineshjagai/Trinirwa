import React from 'react';
import Tweet from './Tweet';

export default function TweetDisplayer({ tweets }) {
  const items = tweets.map((tweet) => <Tweet key={tweet.tweet_id} data={tweet} />);
  return (
    <div>
      {items}
    </div>
  );
}
