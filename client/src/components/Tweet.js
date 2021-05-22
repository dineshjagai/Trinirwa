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
  getAllCommentsForTweet,
  updateTweetComments,
  deleteComment,
  getHiders,
} from './Module';
import { getCurrentUsername, getCurrentHashTag } from '../auth/authServices';
import CommentDisplayer from './CommentDisplayer';
import DialogAnalytics from './AnalyticsTweet';

const hash = require('object-hash');

export default function Tweet({ data, handleDelete }) {
  const user = getCurrentUsername();
  const [isLikedBool, setIsLike] = useState(false);
  const [likes, setLikes] = useState(data.tweet_likes);
  const [numComments, setNumComments] = useState(data.tweet_comments);
  const [id] = useState(data.tweet_id);
  const [blocks, setBlocks] = useState(data.tweet_blocks);
  const [isOwner] = useState(data.user === user);
  const [avatar, setAvatar] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [allComments, setComments] = useState([]);
  const [display, setDisplay] = useState(true);
  const hashtag = getCurrentHashTag();
  const postComment = (content, tweetId) => {
    const timestamp = new Date().toISOString();
    const commentId = hash(`${content}${user}${timestamp}`);
    const newComment = {
      comment_id: commentId,
      tweet_id: tweetId,
      user,
      content,
      timestamp,
    };
    allComments.unshift(newComment);
    addComment(newComment).then((res) => {
      console.log(res.message);
      updateTweetComments(id, numComments + 1).then((result) => {
        console.log(result.message);
        setNumComments(numComments + 1);
      }).catch((err) => console.log(err.message));
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
    await getAllCommentsForTweet(data.tweet_id).then((res) => {
      const { comments } = res.data;
      setComments(comments);
    }).catch((err) => console.log(err.message));
    await getHiders(id).then((res) => {
      console.log(res.data);
    }).catch((err) => console.log(err.message));
  };

  const handleComment = (input, countComments) => {
    if (input === '') return;
    postComment(input, id);
  };
  const handleDeleteorHideInternal = () => {
    setDisplay(false);
    handleDelete(id, isOwner);
  };
  const handleDeleteComment = (toDel) => {
    const newList = allComments.filter((comment) => comment.comm_id !== toDel);
    setComments(newList);
    deleteComment(toDel).then((res) => {
      console.log(res);
      setNumComments(numComments - 1);
    }).catch((err) => console.log(err.message));
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
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
  }, [items]);

  useEffect(() => {
    getData();
  }, []);

  const date = (data.tweet_date.split('T'))[0];
  const newAvatar = `/api/viewFile/${avatar}`;
  const newMedia = `/api/viewFile/${data.content}`;

  return (
    <>
      <div style={{ display: display ? 'block' : 'none' }} id="container_tweet">
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
              onClick={handleDeleteorHideInternal}
            >
              <CloseRoundedIcon id={data.tweet_id} />
            </IconButton>
          </Tooltip>
        </div>
        <Divider variant="middle" />
        <div className="tweet_content">
          <>
            {data.type === 'text' && (
              <p style={{ textAlign: 'left' }}>
                {data.content}
              </p>
            )}
            {data.type === 'video' && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video className="tweet_video" controls>
                {' '}
                <source src={newMedia} />
              </video>
            )}
            {data.type === 'song' && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <audio controls>
                <source src={newMedia} />
              </audio>
            )}
            {data.type === 'picture' && <img className="tweet_image" id="tweet_media_picture" src={newMedia} alt="" />}
          </>

        </div>
        <Divider variant="middle" />
        <div className="comment">
          <CommentInput handleComment={handleComment} />
        </div>
        <div
          className="comment_item"
          style={{
            height: isOpen ? '300px' : '200px',
            display: numComments > 0 ? 'block' : 'none',
          }}
        >
          <div style={{
            margin: 'auto',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#0C8367',
          }}
          >
            <span>{ (numComments !== 0) ? `${numComments} comments` : 'Comments'}</span>
          </div>
          <div style={{
            margin: 'auto', width: '90%', height: '100%',
          }}
          >
            <ul
              id={`list${id}`}
              style={{
                whiteSpace: 'nowrap', listStyleType: 'none',
              }}
            >
              {allComments.map((comment) => (
                <li style={{ marginBottom: '35px' }} key={comment.comm_id}>
                  <CommentDisplayer data={comment} handleDeleteComment={handleDeleteComment} />
                </li>
              ))}
            </ul>
          </div>
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
            <span style={{ color: '#0C8367' }}>{`${likes} likes`}</span>
          </div>
          <div style={{ display: isOwner ? 'block' : 'none' }} className="analytics">
            <DialogAnalytics
              tweetId={data.tweet_id}
            />
          </div>
          <div className="comments">
            <button onClick={() => handleClick()} id="viewCommentsBtn" type="button">{!isOpen ? 'View more' : 'View less'}</button>
          </div>
        </div>
      </div>
    </>

  );
}
