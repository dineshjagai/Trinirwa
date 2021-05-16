/* eslint-disable max-len */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tweet from './Tweet';
import { getCurrentUsername } from '../auth/authServices';
import './CenterDisplayerHome.css';

import {
  addTweet,
  deleteTweet,
  fetchAllTweetsPaginated,
  getTweetCount,
  hideTweet,
} from './Module';
import './CenterDisplay.css';
import CommentBox from './CommentBox';
// import Divider from '@material-ui/core/Divider';

// eslint-disable-next-line import/no-unresolved
const hash = require('object-hash');

export default function TweetsDisplayer() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [hasMore, setHasMore] = useState(false);
  const [allTweets, setAllTweets] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const observer = useRef();

  const lastTweetRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);
  const user = getCurrentUsername();

  // eslint-disable-next-line no-unused-vars
  const getData = async () => {
    getTweetCount(user).then((res) => {
      // const {  } = res.data.count[0][0];
      console.log('typeof', res.data.count[0][0].COUNT);
    }).catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setLoading(true);
    fetchAllTweetsPaginated(user, pageNumber, 10).then((res) => {
      setAllTweets((prevTweets) => [...prevTweets, ...res.data.tweets[0]]);
      setLoading(false);
    }).catch((err) => console.log(err));
  }, [pageNumber]);

  const postTweet = () => {
    const input = document.getElementById('tweet').value;
    if (typeof input === 'undefined') {
      return;
    }
    if (input.length === 0) return;
    const dateTime = new Date().toISOString();
    const tweetId = hash(`${input}${user}${dateTime}`);
    const newTweet = {
      user,
      tweet_id: tweetId,
      type: 'text',
      content: input,
      tweet_date: dateTime,
      tweet_likes: 0,
    };

    setAllTweets((prevTweet) => [newTweet, ...prevTweet]);
    // eslint-disable-next-line no-unused-vars
    addTweet(newTweet).then((res) => {
      console.log(allTweets);
    }).catch((err) => {
      console.log(err.message);
    });
  };

  const postPicture = (e) => {
    // upload picture
    const formdata = new FormData();
    const fakePath = document.getElementById('fileInputPictureCommentBox').value;
    formdata.append('image', e.target.files[0], fakePath);
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const input = document.getElementById('tweet').value;
    if (typeof input === 'undefined') {
      return;
    }
    const dateTime = new Date().toISOString();
    const tweetId = hash(`${input}${user}${dateTime}`);
    const upload = async () => {
      let content = '';
      await fetch('/api/uploadFile', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          content = JSON.parse(result).data;
          // eslint-disable-next-line no-unused-vars
        }).catch((error) => {
          console.log(error);
        });
      console.log('content', content);
      const newTweet = {
        user,
        tweet_id: tweetId,
        type: 'picture',
        content,
        tweet_date: dateTime,
        tweet_likes: 0,
      };
      // eslint-disable-next-line no-unused-vars
      await addTweet(newTweet).then((res) => {
        setAllTweets((prevTweet) => [newTweet, ...prevTweet]);
      }).catch((err) => {
        console.log(err.message);
      });
    };
    upload();
  };

  const postVideo = (e) => {
    // upload video
    const formdata = new FormData();
    // console.log(e.target.files);
    const fakePath = document.getElementById('fileInputVideo').value;
    formdata.append('image', e.target.files[0], fakePath);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const input = document.getElementById('tweet').value;
    if (typeof input === 'undefined') {
      return;
    }
    const dateTime = new Date().toISOString();
    const tweetId = hash(`${input}${user}${dateTime}`);

    fetch('/api/uploadFile', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const newTweet = {
          user,
          tweet_id: tweetId,
          type: 'video',
          content: JSON.parse(result).data,
          tweet_date: dateTime,
          tweet_likes: 0,
        };
        addTweet(newTweet).then((res) => {
          console.log(res.message);
          window.location.reload();
        }).catch((err) => {
          console.log(err.message);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postSong = (e) => {
    // upload song
    const formdata = new FormData();
    // console.log(e.target.files);
    const fakePath = document.getElementById('fileInputSong').value;
    formdata.append('image', e.target.files[0], fakePath);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const input = document.getElementById('tweet').value;
    if (typeof input === 'undefined') {
      return;
    }
    const dateTime = new Date().toISOString();
    const tweetId = hash(`${input}${user}${dateTime}`);

    fetch('/api/uploadFile', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const newTweet = {
          user,
          tweet_id: tweetId,
          type: 'song',
          content: JSON.parse(result).data,
          tweet_date: dateTime,
          tweet_likes: 0,
        };
        addTweet(newTweet).then((res) => {
          window.location.reload();
          console.log(res.message);
        }).catch((err) => {
          console.log(err.message);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateState = async (id) => {
    await setAllTweets((prevTweets) => prevTweets.filter((e) => e.tweet_id !== id));
  };
  const handleHideOrDelete = (id, isOwner) => {
    if (isOwner) {
      // eslint-disable-next-line no-unused-vars
      deleteTweet(id).then((res) => {
        console.log('here');
        // setAllTweets((prevTweets) => prevTweets.filter((e) => e.tweet_id !== id));
        updateState(id);
      }).catch((err) => {
        console.log(err.message);
      });
    } else {
      // eslint-disable-next-line no-unused-vars
      hideTweet(id, user).then((res) => {
        setAllTweets((prevTweet) => prevTweet.filter((e) => e.tweet_id !== id));
      }).catch((err) => console.log(err));
    }
  };
  const handlers = {
    postTweet, postPicture, postVideo, postSong,
  };
  // console.log('td', toDisplay);
  return (
    <>
      <div className="container_center">
        <CommentBox className="tweetIpt" handlers={handlers} />
        <div className="tweet_items">
          {allTweets.map((e, index) => {
            if (allTweets.length === index + 1) {
              return (<div ref={lastTweetRef} className="tContainer"><Tweet handleDelete={handleHideOrDelete} data={e} /></div>);
            }
            return (<div className="tContainer"><Tweet handleDelete={handleHideOrDelete} data={e} /></div>);
          })}
        </div>
      </div>
      <div>
        <CircularProgress style={{ color: 'green' }} />
      </div>
    </>
  );
}
