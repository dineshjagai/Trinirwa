/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import './tweet.css';
import LikeIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CommentInput from './CommentInput';
import {
  getAvatar,
  updateTweetLikes,
  isLiked,
  unLikeTweet,
  likeTweet,
  addComment,
} from './Module';
import { getCurrentUsername } from '../auth/authServices';
import CommentDisplayer from './CommentDisplayer';

const hash = require('object-hash');

export default function Tweet({ data, handleDelete }) {
  const user = getCurrentUsername();
  const [isLikedBool, setIsLike] = useState(false);
  const [likes, setLikes] = useState(data.tweet_likes);
  const [id] = useState(data.tweet_id);
  const [blocks, setBlocks] = useState(data.tweet_blocks);
  const [isOwner] = useState(data.user === user);
  const [avatar, setAvatar] = useState('');
  // eslint-disable-next-line eqeqeq
  const [isMedia] = useState(data.type == 'media');
  const postComment = (content, tweetId) => {
    const timestamp = new Date().toISOString();
    const commentId = hash(`${content}${user}${timestamp}`);
    const newComment = {
      commentId,
      tweetId,
      user,
      content,
      timestamp,
    };
    addComment(newComment).then((res) => {
      console.log(res);
    }).catch((err) => console.log(err.message));
  };
  const getData = async () => {
    await getAvatar(data.user).then((res) => {
      setAvatar(res.data.avatar[0].profile_picture);
    }).catch((err) => {
      console.log(err.message);
    });
    await isLiked(user, data.tweet_id).then((res) => {
      if (res.data.bool.length) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }).catch((err) => {
      console.log(err.message);
    });
  };
  const handleComment = (input) => {
    // const obj = document.getElementById(`${id}`);
    // const input = obj.value;
    console.log(input);
    if (input === '') return;
    postComment(input, id);
  };

  const handleLike = () => {
    if (isLikedBool) {
      unLikeTweet(user, id).then((res) => {
        if (res.status === 200) {
          updateTweetLikes(id, likes - 1).then((result) => {
            console.log(result.message);
            setLikes(likes - 1);
          }).catch((err) => {
            console.log(err.message);
          });
        }
      }).catch((err) => {
        console.log(err.message);
      });
    } else {
      likeTweet(user, id).then((res) => {
        updateTweetLikes(id, likes + 1).then((result) => {
          console.log(result);
          setLikes(likes + 1);
        }).catch((err) => {
          console.log(err.message);
        });
      }).catch((err) => {
        console.log(err.message);
      });
    }
    setIsLike(!isLikedBool);
  };

  useEffect(() => {
    getData();
  }, []);
  const date = (data.tweet_date.split('T'))[0];
  const newAvatar = `/viewFile/${avatar}`;
  const newPicture = `/viewFile/${data.content}`;
  let newMediaTweet;
  if (isMedia) {
    newMediaTweet = <img className="tweet_image" id="tweet_media_picture" src={newPicture} alt="" />;
  } else {
    newMediaTweet = data.content;
  }

  return (
    <div>
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

              {data.user}
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
              <CloseRoundedIcon id={data.tweet_id} handleComment={handleComment} />
            </IconButton>
          </Tooltip>
        </div>
        <Divider variant="middle" />
        <div className="tweet_content">
          <p style={{ textAlign: 'left' }}>
            {newMediaTweet}
          </p>
        </div>
        <Divider variant="middle" />
        <div className="comment">
          <CommentInput handleComment={handleComment} />
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
          <div className="comments">
            <button id="viewCommentsBtn" type="button"> View comments</button>
          </div>
          <CommentDisplayer />
        </div>
      </div>

    </div>
  );
}
