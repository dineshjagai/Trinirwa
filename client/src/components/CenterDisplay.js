import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextField from '@material-ui/core/TextField';
import Tweet from './Tweet';
import { addTweet, deleteTweet, getTweets } from './Module';
import './CenterDisplay.css';
import {
  getCurrentUsername,
} from '../auth/authServices';
// import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
// eslint-disable-next-line import/no-unresolved
const hash = require('object-hash');

export default function DisplayerTweets() {
  const [items, setItems] = useState(new Map());
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(255);
  const [toDisplay] = useState(new Set());
  const classes = useStyles();
  const history = useHistory();
  const handleChange = (e) => {
    if ((e.target.value).length >= 0) {
      const u = 255 - (e.target.value).length;
      setCount(u);
    }
  };
  const handleHideOrDelete = (id, isOwner) => {
    if (isOwner) {
      deleteTweet(id).then((res) => {
        console.log(res.message);
        setUpdate(true);
        toDisplay.delete(items.get(id));
        items.delete(id);
      }).catch((err) => {
        console.log(err.message);
      });
    }
  };
  useEffect(() => {
    setUpdate(false);
  }, [update]);
  const user = getCurrentUsername();
  const postTweet = () => {
    setCount(255);
    const input = document.getElementById('tweet').value;
    const dateTime = new Date().toISOString();
    const tweetId = hash(`${input}${user}${dateTime}`);
    const newTweet = {
      username: user,
      tweet_id: tweetId,
      type: 'text',
      content: input,
      tweet_date: dateTime,
      tweet_likes: 0,
    };
    const toAdd = <div className="tContainer"><Tweet handleDelete={handleHideOrDelete} data={newTweet} /></div>;
    const newItems = items;
    toDisplay.add(toAdd);
    newItems.set(tweetId, toAdd);
    setUpdate(true);
    setItems(newItems);
    addTweet(newTweet).then((res) => {
      console.log(res.message);
    }).catch((err) => {
      console.log(err.message);
    });
  };
  useEffect(() => {
    getTweets(user).then((result) => {
      const temp = (result.data.tweets);
      temp.forEach((e) => {
        const toAdd = <div className="tContainer"><Tweet handleDelete={handleHideOrDelete} data={e} /></div>;

        toDisplay.add(toAdd);
        items.set(e.tweet_id, toAdd);
      });
      setUpdate(!update);
    }).catch((err) => {
      console.log(err.message);
    });
  }, []);
  const goLiveHandler = () => {
    alert('I clicked live');
    history.push('/videochat');
  };

  return (
    <div className="container_center">
      <div
        style={{
          backgroundColor: 'white',
          height: 'fit-content',
          borderRadius: '8px',
        }}
        className="whatIsOn"
      >
        <div
          style={{
            width: '90%',
            paddingTop: '4px',
            margin: 'auto',
          }}
        >
          <TextField
            multiline
            id="tweet"
            label="what's on your mind!!"
            variant="outlined"
            helperText={`${count} remaining chars`}
            inputProps={{ maxLength: 255 }}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </div>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
          }}
          className="buttons"
        >
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={goLiveHandler}
            startIcon={<LiveTvIcon />}
          >
            Go live
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<AddAPhotoIcon />}
          >
            Photo/video
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<PostAddIcon />}
            onClick={postTweet}
          >
            Create post
          </Button>
        </div>
      </div>
      <div>
        {toDisplay}
      </div>
    </div>
  );
}
