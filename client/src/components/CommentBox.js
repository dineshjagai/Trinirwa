/* eslint-disable max-len */
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import TextField from '@material-ui/core/TextField';
import './CenterDisplayerHome.css';

import './CenterDisplay.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CommentBox({ handlers }) {
  const { postTweet } = handlers;
  const [count, setCount] = useState(255);
  const handleChange = (e) => {
    const u = 255 - (e.target.value).length;
    setCount(u);
  };
  const classes = useStyles();
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
            // onClick={goLiveHandler}
            startIcon={<LiveTvIcon />}
          >
            Go live
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id="button-media"
            className={classes.button}
            startIcon={<AddAPhotoIcon />}
            // onClick={postPictureTrigger}
          >
            Photo
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id="button-media"
            className={classes.button}
            startIcon={<VideoLibraryIcon />}
            // onClick={postVideoTrigger}
          >
            Video
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id="button-media"
            className={classes.button}
            startIcon={<LibraryMusicIcon />}
            // onClick={postSongTrigger}
          >
            Song
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
          <input
            className="FileUpload"
            accept=".jpg,.png,.gif"
            id="fileInputPicture"
            type="file"
            // onChange={postPicture}
            hidden
          />
          <input
            className="FileUpload"
            id="fileInputVideo"
            type="file"
            // onChange={postVideo}
            hidden
          />
          <input
            className="FileUpload"
            id="fileInputSong"
            type="file"
            // onChange={postSong}
            hidden
          />
        </div>
      </div>
    </div>
  );
}
