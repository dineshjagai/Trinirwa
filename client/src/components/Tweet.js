/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState, useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import './tweet.css';
import LikeIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { getAvatar, updateTweetLikes, isLiked } from './Module';
import idContext from './Context';

export default function Tweet({ data, handleDelete }) {
  const user = useContext(idContext);
  const [isLikedBool, setIsLike] = useState(false);
  const [likes, setLikes] = useState(data.tweet_likes);
  const [id] = useState(data.tweet_id);
  const [isOwner] = useState(data.username === user);
  const [avatar, setAvatar] = useState('');
  const handleLike = () => {
    if (isLikedBool) {
      updateTweetLikes(id, likes - 1).then((res) => {
        console.log(res.message);
      }).catch((err) => {
        console.log(err.message);
      });
      setLikes(likes - 1);
    } else {
      updateTweetLikes(id, likes + 1).then((res) => {
        console.log(res.message);
      }).catch((err) => {
        console.log(err.message);
      });
      setLikes(likes + 1);
    }
    setIsLike(!isLikedBool);
  };

  useEffect(() => {
    isLiked(user, data.tweet_id).then((res) => {
      if (res.data.bool.length) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }).catch((err) => {
      console.log(err.message);
    });
    getAvatar(data.username).then((res) => {
      setAvatar(res.data.avatar[0].profile_picture);
    }).catch((err) => {
      console.log(err.message);
    });
  });
  const date = (data.tweet_date.split('T'))[0];
  const newAvatar = `/viewFile/${avatar}`;
  return (
    <div id="container_tweet">
      <div className="tweet_header">
        <div className="tweet_img">
          <img className="tweet_header" id="tweet_author_picture" src={newAvatar} alt="" />
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
            onClick={handleLike}
            style={{
              borderRadius: '50%',
              padding: '3',
              color: isLikedBool ? 'red' : 'black',
            }}
          >
            <LikeIcon />
          </IconButton>
          <span>{`${likes} likes`}</span>
        </div>
      </div>
    </div>
  );
}
