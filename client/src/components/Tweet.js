/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState, useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import './tweet.css';
import LikeIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { getAvatar } from './Module';
import idContext from './Context';

export default function Tweet({ data, handleDelete }) {
  const user = useContext(idContext);
  const [id] = useState(data.tweet_id);
  const [isOwner] = useState(data.username === user);
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    getAvatar(data.username).then((res) => {
      console.log(res.data.avatar[0]);
      setAvatar(res.data.avatar[0].profile_picture);
      console.log(id);
    }).catch((err) => {
      console.log(err.message);
    });
  }, []);

  useEffect(() => {
  }, [avatar]);
  const date = (data.tweet_date.split('T'))[0];
  return (
    <div id="container_tweet">
      <div className="tweet_header">
        <div className="tweet_img">
          <img className="tweet_header" id="tweet_author_picture" src={avatar} alt="" />
        </div>
        <div className="tweet_text">
          <span
            style={{
              fontSize: '13px',
              fontWeight: 'bold',
            }}
            id="author_username"
          >
            {data.username}
          </span>
          <span style={{ fontSize: '10px' }} id="date">
            {date}
          </span>
        </div>
      </div>
      <div id="menu">
        <Tooltip title={isOwner ? 'Delete post' : 'Hide post'} placement="top">
          <IconButton
            style={{
              borderRadius: '50%',
              padding: '3',
              color: '#0C8367',
            }}
            onClick={() => handleDelete(id, isOwner)}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Divider variant="middle" />
      <div className="tweet_content">
        <p style={{ textAlign: 'left' }}>
          {data.content}
        </p>
      </div>
      <div className="tweet_bottom">
        <div className="likes">
          <IconButton
            style={{
              borderRadius: '50%',
              padding: '3',
              color: 'red',
            }}
          >
            <LikeIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
