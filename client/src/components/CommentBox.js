import React, { useEffect, useState } from 'react';
import './CommentBox.css';
import { addTweet, fetchFollowers, fetchTweets } from './Module';
import TweetDisplayer from './tweetDisplayer';

export default function CommentBox({ uid }) {
  const [comment, setComment] = useState('');
  const [followers, setFollowers] = useState([{}]);
  const [tweets, setTweets] = useState([{}]);
  const [allUserTweetsIn, setAllUserTweetsIn] = useState(false);
  const allTweets = [];
  const [allFollowersTweetsIn, setAllFollowersTweetsIn] = useState(false);

  const onCancel = () => {
    setComment('');
  };

  const onChange = (event) => {
    setComment(event.target.value);
  };

  const postTweet = () => {
    addTweet(comment, uid);
    setComment('');
  };

  useEffect(() => {
    if (tweets.data) {
      setAllUserTweetsIn(true);
    }
  }, [tweets]);

  useEffect(() => {
    if (allUserTweetsIn) {
      let i = 0;
      for (i = 0; i < tweets.data.length; i += 1) {
        allTweets.push(tweets.data[i]);
      }
    }
  }, [allUserTweetsIn]);

  useEffect(() => {
    if (followers.data) {
      setAllFollowersTweetsIn(true);
    }
  }, [followers]);

  useEffect(() => {
    if (allFollowersTweetsIn) {
      let i = 0;
      for (i = 0; i < followers.data.length; i += 1) {
        fetchTweets(followers.data[i].uid_user_two).then((result) => {
          if (result.data.data[0]) {
            allTweets.push(result.data.data[0]);
          }
        });
      }
    }
  }, [allFollowersTweetsIn]);

  useEffect(() => {
    // Tweets from User
    fetchTweets(uid).then((result) => {
      setTweets(result.data);
    });
    // Get follower Ids
    fetchFollowers(uid).then((result) => {
      setFollowers(result.data);
    });
  }, []);

  console.log(allTweets);

  return (
    <div className="feed">
      <div className="commentBox">
        <form action="#" method="post">
          <input type="text" onChange={onChange} value={comment} placeholder="What's on your mind?" />
          <div className="btn">
            <button type="submit" className="comment" disabled={comment.length < 1} onClick={postTweet}>TWEET</button>
            <button type="button" className="cancel" onClick={onCancel}>CANCEL</button>
          </div>
        </form>
      </div>
      <div className="center">
        <TweetDisplayer tweets={allTweets} />
      </div>
    </div>

  );
}
