/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import TextField from '@material-ui/core/TextField';
import Message from './Message';
import Tweet from './Tweet';
// eslint-disable-next-line no-unused-vars
import { getCurrentUsername, getCurrentReceiver } from '../auth/authServices';
import './CenterDisplayerHome.css';

import {
  addMessage,
  fetchMessages,
} from './Module';
import './CenterDisplay.css';

// import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
// eslint-disable-next-line import/no-unresolved
const hash = require('object-hash');

export default function DisplayerMessages() {
  const receiver = getCurrentReceiver();
  console.log(`receiver = ${receiver}`);
  //   const history = useHistory();

  const [items] = useState(new Map());
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(255);
  const [toDisplay] = useState(new Set());
  const classes = useStyles();
  const user = getCurrentUsername();
  const handleChange = (e) => {
    if ((e.target.value).length >= 0) {
      const u = 255 - (e.target.value).length;
      setCount(u);
    }
  };
  useEffect(() => {
    console.log('refreshed');
    setUpdate(false);
  }, [update]);
  const postMessage = () => {
    setCount(255);
    const input = document.getElementById('message').value;
    if (typeof input === 'undefined') {
      return;
    }
    if (input.length === 0) return;
    const dateTime = new Date().toISOString();
    const messageId = hash(`${input}${user}${dateTime}`);
    const newMessage = {
      user,
      message_id: messageId,
      type: 'text',
      content: input,
      message_date: dateTime,
      receiver,
    };
    // const toAdd = <div className="tContainer"><Tweet handleDelete={handleHideOrDelete} data={newMessage} /></div>;
    // // const newItems = items;
    // const newToDisplay = new Set([toAdd, ...toDisplay]);
    // const newItems = items;

    // setToDisplay(newToDisplay);
    // items.set(messageId, toAdd);
    // newItems.set(messageId, toAdd);
    // setUpdate(true);
    // setItems(newItems);
    // console.log('items length', items.length);
    addMessage(newMessage).then((res) => {
      console.log(res.message);
    //   window.location.reload();
    }).catch((err) => {
      console.log(err.message);
    });
  };

  const getData = async () => {
    fetchMessages(user, receiver).then((res) => {
      const { messages } = res.data;
      console.log(`ttt--${messages}`);
      messages.forEach((e) => {
        const toAdd = <div className="tContainer"><Message data={e} /></div>;
        toDisplay.add(toAdd);
        items.set(e.tweet_id, toAdd);
      });
      setUpdate(true);
    }).catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const postPicture = (e) => {
    // upload picture
    const formdata = new FormData();
    // console.log(e.target.files);
    const fakePath = document.getElementById('fileInputPicture').value;
    formdata.append('image', e.target.files[0], fakePath);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const input = document.getElementById('message').value;
    if (typeof input === 'undefined') {
      return;
    }
    const dateTime = new Date().toISOString();
    const messageId = hash(`${input}${user}${dateTime}`);

    fetch('/api/uploadFile', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(`---uploading a pic ---:${result}`);
        const newMessage = {
          user,
          message_id: messageId,
          type: 'picture',
          content: JSON.parse(result).data,
          message_date: dateTime,
          receiver,
        };
        console.log(`is this good? ${newMessage}`);
        // const toAdd = <div className="tContainer"><Tweet handleDelete={handleHideOrDelete} data={newMessage} /></div>;
        // const newItems = items;
        // const newToDisplay = new Set([toAdd, ...toDisplay]);
        // setToDisplay(newToDisplay);
        // newItems.set(messageId, toAdd);
        // setUpdate(true);
        // setItems(newItems);
        // console.log(items.length);
        addMessage(newMessage).then((res) => {
          console.log(res.message);
        //   window.location.reload();
        }).catch((err) => {
          console.log(err.message);
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
    const input = document.getElementById('message').value;
    if (typeof input === 'undefined') {
      return;
    }
    const dateTime = new Date().toISOString();
    const messageId = hash(`${input}${user}${dateTime}`);

    fetch('/api/uploadFile', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const newMessage = {
          user,
          message_id: messageId,
          type: 'video',
          content: JSON.parse(result).data,
          message_date: dateTime,
          receiver,
        };
        // console.log(`is this good? ${newMessage.user}`);
        // const toAdd = <div className="tContainer"><Tweet handleDelete={handleHideOrDelete} data={newMessage} /></div>;
        // const newItems = items;
        // const newToDisplay = new Set([toAdd, ...toDisplay]);
        // setToDisplay(newToDisplay);
        // newItems.set(messageId, toAdd);
        // setUpdate(true);
        // setItems(newItems);
        // console.log(items.length);
        addMessage(newMessage).then((res) => {
          console.log(res.message);
        //   window.location.reload();
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
    const input = document.getElementById('message').value;
    if (typeof input === 'undefined') {
      return;
    }
    const dateTime = new Date().toISOString();
    const messageId = hash(`${input}${user}${dateTime}`);

    fetch('/api/uploadFile', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const newMessage = {
          user,
          message_id: messageId,
          type: 'song',
          content: JSON.parse(result).data,
          message_date: dateTime,
          receiver,
        };
        // console.log(`is this good? ${newMessage.user}`);
        // const toAdd = <div className="tContainer"><Tweet handleDelete={handleHideOrDelete} data={newMessage} /></div>;
        // const newItems = items;
        // const newToDisplay = new Set([toAdd, ...toDisplay]);
        // setToDisplay(newToDisplay);
        // newItems.set(messageId, toAdd);
        // setUpdate(true);
        // setItems(newItems);
        // console.log(items.length);
        addMessage(newMessage).then((res) => {
        //   window.location.reload();
          console.log(res.message);
        }).catch((err) => {
          console.log(err.message);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postPictureTrigger = () => {
    document.getElementById('fileInputPicture').click();
  };

  const postVideoTrigger = () => {
    document.getElementById('fileInputVideo').click();
  };

  const postSongTrigger = () => {
    document.getElementById('fileInputSong').click();
  };
  console.log('td', toDisplay);
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
            id="message"
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
            id="button-media"
            className={classes.button}
            startIcon={<AddAPhotoIcon />}
            onClick={postPictureTrigger}
          >
            Photo
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id="button-media"
            className={classes.button}
            startIcon={<VideoLibraryIcon />}
            onClick={postVideoTrigger}
          >
            Video
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id="button-media"
            className={classes.button}
            startIcon={<LibraryMusicIcon />}
            onClick={postSongTrigger}
          >
            Song
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<PostAddIcon />}
            onClick={postMessage}
          >
            Create post
          </Button>
          <input
            className="FileUpload"
            accept=".jpg,.png,.gif"
            id="fileInputPicture"
            type="file"
            onChange={postPicture}
            hidden
          />
          <input
            className="FileUpload"
            id="fileInputVideo"
            type="file"
            onChange={postVideo}
            hidden
          />
          <input
            className="FileUpload"
            id="fileInputSong"
            type="file"
            onChange={postSong}
            hidden
          />
        </div>
      </div>
      <div>
        {toDisplay}
      </div>
    </div>
  );
}
