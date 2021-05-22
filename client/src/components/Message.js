/* eslint-disable jsx-a11y/media-has-caption */
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import './tweet.css';
import {
  getAvatar,
} from './Module';
import { getCurrentUsername } from '../auth/authServices';

export default function Message({ data }) {
  const user = getCurrentUsername();
  // const receiver = getCurrentReceiver();
  const [avatar, setAvatar] = useState('');
  // const [hadRead, setHasRead] = useState(false);
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

  const date = (data.message_date.split('T'))[0];
  const newAvatar = `/api/viewFile/${avatar}`;
  const newMedia = `/api/viewFile/${data.content}`;

  let newMediaMessage;
  if (isPicture) {
    newMediaMessage = <img className="tweet_image" id="tweet_media_picture" src={newMedia} alt="" />;
  } else if (isVideo) {
    newMediaMessage = (
      <video className="tweet_video" controls>
        {' '}
        <source src={newMedia} />
      </video>
    );
  } else if (isSong) {
    console.log('song');
    newMediaMessage = (
      <audio controls>
        <source src={newMedia} />
      </audio>
    );
  } else {
    newMediaMessage = data.content;
  }
  // eslint-disable-next-line eqeqeq
  const hasRead = (data.is_read == 1);
  let messageStatus = 'Message Status : Delivered';
  if (hasRead) {
    messageStatus = 'Message Status : Read';
  }

  let senderReceiver = 'Receiver>';
  if (user === data.user) {
    senderReceiver = 'Sender>';
  } else {
    messageStatus = '';
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
            {senderReceiver}
            {' '}
            {data.user}

          </span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 'bold',
            }}
            id="author_message"

          >
            {' '}
            {messageStatus}

          </span>
          <span style={{ fontSize: '10px' }} id="date">
            {date}
          </span>
        </div>
      </div>

      <Divider variant="middle" />
      <div className="tweet_content">
        <p style={{ textAlign: 'left' }}>
          {newMediaMessage}
        </p>
      </div>
      <Divider variant="middle" />

    </div>

  );
}
