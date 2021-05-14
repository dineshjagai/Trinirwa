import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import './tweet.css';
import {
  getAvatar,
} from './Module';

export default function Tweet({ data }) {
//   const user = getCurrentUsername();
  const [avatar, setAvatar] = useState('');
  // eslint-disable-next-line eqeqeq
  const [isPicture] = useState(data.type === 'picture');
  const [isVideo] = useState(data.type === 'video');
  const [isSong] = useState(data.type === 'song');

  const getData = async () => {
    await getAvatar(data.user).then((res) => {
      setAvatar(res.data.avatar[0].profile_picture);
    }).catch((err) => {
      console.log(err.message);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const date = (data.tweet_date.split('T'))[0];
  const newAvatar = `/api/viewFile/${avatar}`;
  const newMedia = `/api/viewFile/${data.content}`;

  let newMediaTweet;
  if (isPicture) {
    newMediaTweet = <img className="tweet_image" id="tweet_media_picture" src={newMedia} alt="" />;
  } else if (isVideo) {
    newMediaTweet = (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video className="tweet_video" controls>
        {' '}
        <source src={newMedia} />
      </video>
    );
  } else if (isSong) {
    console.log('song');
    newMediaTweet = (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <audio controls>
        <source src={newMedia} />
      </audio>
    );
  } else {
    newMediaTweet = data.content;
  }

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

            {data.user}
          </span>
          <span style={{ fontSize: '10px' }} id="date">
            {date}
          </span>
        </div>
      </div>

      <Divider variant="middle" />
      <div className="tweet_content">
        <p style={{ textAlign: 'left' }}>
          {newMediaTweet}
        </p>
      </div>
      <Divider variant="middle" />

    </div>

  );
}
