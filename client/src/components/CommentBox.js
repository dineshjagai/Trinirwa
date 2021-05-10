import React, { useState, useContext, useEffect } from 'react';
import './CommentBox.css';
// import { addTweet } from './Module';
// import TweetDisplayer from './tweetDisplayer';
import Tweet from './Tweet';
import idContext from './Context';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

export default function CommentBox() {
  // const [followers, setFollowers] = useState([{}]);
  // const [tweets, setTweets] = useState([{}]);
  const [items, setItems] = useState([]);
  const [posted, setPosted] = useState(false);
  // const [allUserTweetsIn, setAllUserTweetsIn] = useState(false);
  // const allTweets = [];
  // const [tweetsIn, setTweetIn] = useState([{}]);
  // const [allFollowersTweetsIn, setAllFollowersTweetsIn] = useState(false);
  const user = useContext(idContext);
  const onCancel = () => {
  };

  const postTweet = () => {
    console.log(document.getElementById('tweet').value);
    const input = document.getElementById('tweet').value;
    const dateTime = new Date().toISOString();
    const newTweet = {
      user,
      type: 'text',
      content: input,
      tweet_date: dateTime,
      tweet_likes: 0,
    };
    const toAdd = <Tweet data={newTweet} />;
    console.log(items.length);
    const newItems = items;
    newItems.push(toAdd);
    setPosted(true);
    setItems(newItems);
    console.log(items.length);
    // addTweet(input, dateTime, user);
  };

  // const getTweets = () => {
  //   // Tweets from User
  //   console.log(user);
  //   fetchTweets(user).then((result) => {
  //     setTweets(result.data);
  //   });
  //   console.log(tweets);
  //   // Get follower Ids
  //   // fetchFollowers(uid).then((result) => {
  //   //   setFollowers(result.data);
  //   // });
  //   // console.log(followers);

  //   if (tweets.data) {
  //     setAllUserTweetsIn(true);
  //     if (allUserTweetsIn) {
  //       let i = 0;
  //       for (i = 0; i < tweets.data.length; i += 1) {
  //         allTweets.push(tweets.data[i]);
  //       }
  //     }
  //   }

  //   // if (followers.followers) {
  //   //   setAllFollowersTweetsIn(true);

  //   //   if (allFollowersTweetsIn) {
  //   //     let i = 0;
  //   //     for (i = 0; i < followers.followers.length; i += 1) {
  //   //       fetchTweets(followers.followers[i].uid_user_two).then((result) => {
  //   //         if (result.data.data[0]) {
  //   //           allTweets.push(result.data.data[0]);
  //   //         }
  //   //       });
  //   //     }
  //   //   }
  //   // }
  //   setTweetIn(allTweets);
  //   // console.log(allTweets);
  // };

  // useEffect(() => {
  //   getTweets();
  // }, []);

  // useEffect(() => {
  //   const newItems = tweetsIn.map((tweet) => <Tweet key={tweet.tweet_id} data={tweet} />);
  //   setItems(newItems);
  // }, [items]);

  // const items = tweetsIn.map((tweet) => <Tweet key={tweet.tweet_id} data={tweet} />);

  // console.log(allTweets);
  useEffect(() => {
    setPosted(false);
    console.log(`${items.length}, here`);
  }, [posted]);

  return (
    <div className="feed">
      <div className="commentBox">
        <form action="#" method="post">
          <input id="tweet" type="text" placeholder="What's on your mind?" />
          <div className="btn">
            <button type="submit" className="comment" onClick={postTweet}>Tweet</button>
            <button type="button" className="cancel" onClick={onCancel}>C</button>
          </div>
        </form>
      </div>
      <div>
        {items}
      </div>
    </div>

  );
}
