/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import './tweet.css';
import LikeIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import Dropdown from './Menu';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Tweet({ data }) {
  const classes = useStyles();
  console.log(data.content);
  return (
    <div id="container_tweet" style={{ margin: '20px' }}>
      <div id="tweet_header">
        <img className="tweet_header" id="tweet_author_picture" src="https://cdn001.tintin.com/public/tintin/img/static/essentials/tintin-milou.png" alt="" />
        <div className="text">
          <b style={{ fontSize: '12px' }} id="author_username">{data.username}</b>
          <div style={{ fontSize: '12px' }} id="date">
            {data.tweet_date}
          </div>
        </div>

      </div>
      <div id="menu">
        <Dropdown />
      </div>
      <Divider variant="middle" />
      <p style={{ textAlign: 'center' }}>
        {' '}
        {data.content}
      </p>
      <Divider variant="middle" />

      <div className="likes" style={{ fontSize: '12px' }} id="tweets_like">{data.tweet_likes}</div>
      <div className="likes">
        <IconButton aria-label="delete" className={classes.margin}>
          <LikeIcon color="red" />
        </IconButton>
      </div>
    </div>
  );
}
