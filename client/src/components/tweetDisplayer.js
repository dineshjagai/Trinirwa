import Tweet from './Tweet';

export default function TweetDisplayer() {
  const all = [{
    uid: 3, tweet_id: 5, type: 'text', content: "Je vais a l'ecole", tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 6, type: 'text', content: "Je vais a l'ecole", tweet_date: '2002-09-08T04:00:00.000Z', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 7, type: 'text', content: 'tweet2', tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 8, type: 'text', content: 'tweet3', tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 9, type: 'text', content: 'tweet4', tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 10, type: 'text', content: 'tweet5', tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 11, type: 'text', content: 'tweet2', tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 12, type: 'text', content: 'tweet3', tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 13, type: 'text', content: 'tweet4', tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  },
  {
    uid: 3, tweet_id: 14, type: 'text', content: 'tweet5', tweet_date: '0000-00-00 00:00:00', tweet_likes: 10,
  }];

  const items = all.map((tweet) => <Tweet key={tweet.tweet_id} data={tweet}/>);

  return (
      <div>
          {items}
      </div>
  );
}
