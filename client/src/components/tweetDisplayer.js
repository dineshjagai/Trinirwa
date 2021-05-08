import React from 'react';
import Tweet from './Tweet';

export default function TweetDisplayer({ tweets }) {
  console.log(tweets);
  if (tweets.length > 0) {
    window.location.reload(false);
    const items = tweets.map((tweet) => <Tweet key={tweet.tweet_id} data={tweet} />);
    return (
      <div>
        {items}
      </div>
    );
  }

  return (<div />);
}
